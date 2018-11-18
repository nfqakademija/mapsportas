<?php

namespace App\Controller;

use App\Entity\EventApplication;
use App\Entity\SportEvent;
use App\Entity\User;
use App\Form\ApplicationType;
use App\Form\SportEventType;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SportEventController extends AbstractController
{

    /**
     * @Route("/api/public/sport/events", name="get_sport_events", methods="GET")
     */
    public function getSportEvents()
    {
        $sportEvents = $this->getDoctrine()->getRepository(SportEvent::class)->findAll();
        $serializer = SerializerBuilder::create()->build();
        $response = json_decode(
            $serializer->serialize($sportEvents, 'json', SerializationContext::create()->setGroups(array('sportEvent')))
        );

        return new JsonResponse($response, Response::HTTP_OK);
    }

    /**
     * @Route("/api/public/sport/events/upcoming", name="get_sport_events_upcoming", methods="GET")
     */
    public function getUpcomingEvents()
    {
        $sportEvents = $this->getDoctrine()->getRepository(SportEvent::class)->findUpcomingEvents();
        $serializer = SerializerBuilder::create()->build();
        return new JsonResponse(
            json_decode($serializer->serialize($sportEvents, 'json', SerializationContext::create()->setGroups(array('sportEvent'))))
        );
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

            return new JsonResponse([
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

    public function autoApply(User $user, SportEvent $event) :void
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
