<?php

namespace App\Controller;

use App\Entity\User;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class EventApplicationController extends AbstractController
{
    /**
     * @Route("/api/user/applications", name="user_application")
     */
    public function getApplicationByUser()
    {
        /** @var User $user */
        $user = $this->getUser();
        $serializer = SerializerBuilder::create()->build();
        $applications = json_decode(
            $serializer->serialize(
                $user->getUserApplications(),
                'json',
                SerializationContext::create()->setGroups(
                    array('user')
                )
            )
        );

        return new JsonResponse($applications, JsonResponse::HTTP_OK);
    }
}
