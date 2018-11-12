<?php

namespace App\Controller;

use App\Entity\SportEvent;
use App\Form\SportEventType;
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
        $response = [];
        foreach ($sportEvents as $sportEvent) {
            $response[] = [
                'id' => $sportEvent->getId(),
                'sportType' => [
                    'id' => $sportEvent->getSportType()->getId(),
                    'name' => $sportEvent->getSportType()->getName(),
                ],
                'sportVenue' => [
                    'id' => $sportEvent->getSportVenue()->getId(),
                    'name' => $sportEvent->getSportVenue()->getName(),
                    'description' => $sportEvent->getSportVenue()->getdescription(),
                    'adress' => $sportEvent->getSportVenue()->getAdress(),
                    'city' => $sportEvent->getSportVenue()->getCity(),
                ],
                'maxMembers' => $sportEvent->getMaxMembers(),
                'date' => $sportEvent->getDate(),
            ];
        }
        return new JsonResponse($response,Response::HTTP_OK);
    }

    /**
     * @Route("/api/sport/event", name="add_sport_event", methods="POST")
     */
    public function addSportEvent(Request $request)
    {
        $sportEvent = new SportEvent();
        $data = json_decode($request->getContent(), true);
        $data['date'] = new \DateTime($data['date']);
        $form = $this->createForm(SportEventType::class,$sportEvent);
        $form->setData($sportEvent);
        $form->submit($data, false);
        if ($form->isSubmitted() && $form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($sportEvent);
            $manager->flush();

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
}
