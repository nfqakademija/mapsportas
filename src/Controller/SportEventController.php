<?php

namespace App\Controller;

use App\Entity\EventApplication;
use App\Entity\SportEvent;
use App\Entity\User;
use App\Form\ApplicationType;
use App\Form\ViolationExtractor;
use App\Form\SportEventType;
use App\Service\FilterProvider;
use App\Service\NotificationManager;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SportEventController extends AbstractController
{
    private $notificationManager;
    private $filterProvider;
    private $violationExtractor;
    private $serializer;

    public function __construct(
        NotificationManager $notificationManager,
        FilterProvider $filterProvider,
        ViolationExtractor $violationExtractor
    ) {
        $this->notificationManager = $notificationManager;
        $this->filterProvider = $filterProvider;
        $this->violationExtractor = $violationExtractor;
        $this->serializer = SerializerBuilder::create()->build();
    }

    /**
     * @Route("/api/public/sport/events", name="get_sport_events", methods="POST")
     */
    public function getSportEvents(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $filter = $this->filterProvider->createFilterWithData($data);

        $repository = $this->getDoctrine()->getRepository(SportEvent::class);
        $sportEvents = $repository->findFilteredEvents($filter);
        $count = $repository->findEventsCount($filter);
        $serializer = SerializerBuilder::create()->build();

        $sportEvents = json_decode(
            $serializer->serialize($sportEvents, 'json', SerializationContext::create()->setGroups(array('sportEvent')))
        );
        $count = json_decode(
            $serializer->serialize($count[0][1], 'json')
        );
        $response = [
            'sportEvents' => $sportEvents,
            'count' => $count
        ];

        return new JsonResponse($response, Response::HTTP_OK);
    }

    /**
     * @Route("/api/public/sport/events/upcoming/{i}/{first}", name="get_sport_events_upcoming", methods="GET")
     */
    public function getUpcomingEvents(int $i, int $first)
    {
        $sportEvents = $this->getDoctrine()->getRepository(SportEvent::class)->findUpcomingEvents($i, $first);
        $serializer = SerializerBuilder::create()->build();
        $response = json_decode(
            $serializer->serialize($sportEvents, 'json', SerializationContext::create()->setGroups(array('sportEvent')))
        );

        return new JsonResponse($response, Response::HTTP_OK);
    }

    /**
     * @Route("/api/public/sport/events/{id}", name="get_sport_event", methods="GET")
     */
    public function show(int $id)
    {
        $sportEvent = $this->getDoctrine()->getRepository(SportEvent::class)->find($id);
        $serializer = SerializerBuilder::create()->build();
        $response = json_decode(
            $serializer->serialize($sportEvent, 'json', SerializationContext::create()->setGroups(array('sportEvent')))
        );

        return new JsonResponse($response, Response::HTTP_OK);
    }

    /**
     * @Route("/api/sport/event", name="add_sport_event", methods="POST")
     */
    public function addSportEvent(Request $request)
    {
        $sportEvent = new SportEvent();
        $data = json_decode($request->getContent(), true);
        $data['creator'] = $this->getUser()->getId();
        $data['date'] = new \DateTime($data['date']);
        $form = $this->createForm(SportEventType::class, $sportEvent);
        $form->setData($sportEvent);
        $form->submit($data, false);
        if ($form->isSubmitted() && $form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($sportEvent);
            $manager->flush();

//            apply for new event
            $user = $this->getUser();
            $this->autoApply($user, $sportEvent);


            return new JsonResponse([
                'success_message' => 'Successfully created new Sport Event'
            ], Response::HTTP_CREATED);
        } else {
            $errors = $this->serializer->serialize($this->violationExtractor->extract($form), 'json');

            return new JsonResponse(json_decode($errors), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/api/sport/event/apply", name="apply_sport_event", methods="POST")
     */
    public function applyForEvent(Request $request)
    {

        $application = new EventApplication();
        $data = json_decode($request->getContent(), true);
        $data['user'] = $this->getUser()->getId();
        $data['createdAt'] = new \DateTime('now');
        $event = $this->getDoctrine()->getRepository(SportEvent::class)->find($data['sportEvent']);
        $maxMembers = $event->getMaxMembers();

//        check if user have already applyed for this event
        $applications = $this->getDoctrine()->getRepository(EventApplication::class)
            ->findby([
                'user' => $data['user'],
                'sportEvent' => $data['sportEvent'],
            ]);
        if (count($applications) !== 0) {
            return new JsonResponse([
                'error_message' => 'You have already applyed for this Event.'
            ], Response::HTTP_BAD_REQUEST);
        }

//        check if there still place for event
        if (count($event->getApplyedUsers()) >= $maxMembers) {
            return new JsonResponse([
                'error_message' => 'Event is full, you can\'t apply for it.'
            ], Response::HTTP_BAD_REQUEST);
        }
        $form = $this->createForm(ApplicationType::class, $application);
        $form->setData($application);
        $form->submit($data, false);
        if ($form->isSubmitted() && $form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($application);
            $manager->flush();
            $this->notificationManager->notify(
                $event,
                [
                    'application' => $application,
                    'action' => EventApplication::EVENT_JOIN
                ]
            );
            $data = $this->serializer->serialize(
                $application,
                'json',
                SerializationContext::create()->setGroups('application')
            );
            return new JsonResponse([
                'application' => json_decode($data),
                'success_message' => 'Successfully applyed for Sport Event'
            ], Response::HTTP_CREATED);
        } else {
            $errors = [];
            foreach ($form->getErrors(true) as $error) {
                if ($error->getCause()) {
                    $errors[substr($error->getCause()->getPropertyPath(), 5)] = $error->getMessage();
                }
            }

            return new JsonResponse([
                'error_message' => $errors
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/api/sport/event/leave/{event}", name="leave_sport_event", methods="DELETE")
     */
    public function leaveEvent(int $event)
    {
        $user = $this->getUser();
        $application = $this->getDoctrine()
            ->getRepository(EventApplication::class)
            ->findOneBy([
                'sportEvent' => $event,
                'user' => $user->getId(),
            ]);
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($application);
        $manager->flush();

        $this->notificationManager->notify(
            $application->getSportEvent(),
            [
                'application' => $application,
                'action' => EventApplication::EVENT_LEAVE
            ]
        );

        return new JSONResponse([
            'success_message' => 'Successfully left Sport Event',
        ], Response::HTTP_OK);
    }

    public function autoApply(User $user, SportEvent $event): void
    {
        $application = new EventApplication();
        $application->setSportEvent($event);
        $application->setUser($user);
        $date = new \DateTime('now');
        $application->setCreatedAt($date);
        $manager = $this->getDoctrine()->getManager();
        $manager->persist($application);
        $manager->flush();
    }
}
