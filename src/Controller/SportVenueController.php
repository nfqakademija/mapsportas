<?php

namespace App\Controller;

use App\Entity\SportVenue;
use App\Utilities\Utilities as Util;
use App\Form\SportVenueType;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SportVenueController extends AbstractController
{
    /**
     * @Route("/api/public/sport/venues", name="get_sport_venues", methods="GET")
     */
    public function getSportVenues()
    {
        $sportVenues = $this->getDoctrine()->getRepository(SportVenue::class)->findAll();
        $serializer = SerializerBuilder::create()->build();
        $response = json_decode(
            $serializer->serialize($sportVenues, 'json', SerializationContext::create()->setGroups(array('sportVenue')))
        );

        return new JsonResponse($response, Response::HTTP_OK);
    }

    /**
     * @Route("/api/admin/sport/venue", name="add_sport_venue", methods="POST")
     */
    public function addSportType(Request $request)
    {
        $sportVenue = new SportVenue();
        $data = json_decode($request->getContent(), true);

        $venuePhoto = $request->files->get('form')['venuePhoto'];

        $form = $this->createForm(SportVenueType::class, $sportVenue);
        $form->setData($sportVenue);
        $form->submit($data, false);
        if ($form->isSubmitted() && $form->isValid()) {
            if ($venuePhoto !== null) {
                $venueDirectory = $this->getParameter('venues_directory');
                $filename = Util::upload($venuePhoto, $venueDirectory);
                $sportVenue->setVenuePhoto($filename);
            }

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($sportVenue);
            $manager->flush();

            return new JsonResponse([
                'success_message' => 'Successfully created new Sport Venue'
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
     * @Route("/api/admin/sport/venue/{id}", name="remove_sport_type", methods="DELETE")
     */
    public function removeSportVenue(int $id)
    {
        $sportVenue = $this->getDoctrine()
            ->getRepository(SportVenue::class)
            ->find($id);
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($sportVenue);
        $manager->flush();

        return new JSONResponse([
            'success_message' => 'Successfully deleted Sport Venue',
        ], Response::HTTP_OK);
    }
}
