<?php

namespace App\Controller;

use App\Entity\SportType;
use App\Form\SportTypeType;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SportTypeController extends AbstractController
{
    /**
     * @Route("/api/public/sport/types", name="get_sport_types", methods="GET")
     */
    public function getSportTypes()
    {
        $serializer = SerializerBuilder::create()->build();
        $sportTypes = $this->getDoctrine()->getRepository(SportType::class)->findAll();
        $response = json_decode($serializer->serialize($sportTypes, 'json', SerializationContext::create()->setGroups(array('sportType'))));

        return new JsonResponse($response, Response::HTTP_OK);
    }

    /**
     * @Route("/api/admin/sport/type", name="add_sport_type", methods="POST")
     */
    public function addSportType(Request $request)
    {
        $sportType = new SportType();
        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(SportTypeType::class, $sportType);
        $form->setData($sportType);
        $form->submit($data, false);
        if ($form->isSubmitted() && $form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($sportType);
            $manager->flush();

            return new JsonResponse([
                'success_message' => 'Successfully created new Sport Type'
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
     * @Route("/api/admin/sport/type/{id}", name="remove_sport_type", methods="DELETE")
     */
    public function removeSportType(int $id)
    {
        $sportType = $this->getDoctrine()
            ->getRepository(SportType::class)
            ->find($id);
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($sportType);
        $manager->flush();

        return new JSONResponse([
            'success_message' => 'Successfully deleted Sport Type',
        ], Response::HTTP_OK);
    }
}
