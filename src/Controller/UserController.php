<?php

namespace App\Controller;

use App\Entity\User;
use App\Event\FileUploadedEvent;
use App\Form\RegistrationForm;
use FOS\UserBundle\Model\UserManagerInterface;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserController extends controller
{
    /**
     * @var UserManagerInterface
     */
    private $userManager;

    public function __construct(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * @Route("/api/user/edit", name="api_user_edit", methods="PUT")
     */
    public function editUser(Request $request)
    {
        $user = $this->getUser();
        $form = $this->createForm(RegistrationForm::class, $user);
        $data = json_decode($request->getContent(), true);
        $form->submit($data, false);
        $user->setUpdatedAt(new \DateTime('now'));
        if ($form->isSubmitted() && $form->isValid()) {
            $this->userManager->updateUser($user);
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
        $this->userManager->updateUser($user);

        return new JsonResponse([
            'success_message' => 'Successfully updated user'
        ], Response::HTTP_OK);
    }

    /**
     * @Route("/api/user", name="api_user", methods="GET")
     */
    public function getCurrentUser()
    {
        $user = $this->getUser();
        $serializer = SerializerBuilder::create()->build();
        $response = json_decode(
            $serializer->serialize($user, 'json', SerializationContext::create()->setGroups(array('user')))
        );

        return new JsonResponse(['user' => $response], Response::HTTP_OK);
    }

    /**
     * @Route("/api/admin/promote/{id}", name="promote_to_admin", methods="GET")
     */
    public function promoteToAdmin(int $id)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        $user->addRole("ROLE_ADMIN");
        $manager = $this->getDoctrine()->getManager();
        $manager->persist($user);
        $manager->flush();

        return new JsonResponse([
            'success_message' => 'Successfully promoted user'
        ], Response::HTTP_OK);
    }

    /**
     * @Route("/api/user/avatar", name="api_user_avatar_create", methods="POST")
     */
    public function createAvatar(Request $request)
    {
        /** @var UploadedFile $file */
        $file = $request->files->get('avatar');
        if (!in_array($file->getMimeType(), ['image/png', 'image/jpeg', 'image/jpg'])) {
            return new JsonResponse('Wrong file uploaded', JsonResponse::HTTP_BAD_REQUEST);
        }
        /** @var User $user */
        $user = $this->getUser();
        $fileUploadedEvent = new FileUploadedEvent(
            $file,
            $user,
            $this->getParameter('avatars_directory')
        );
        $this->get('event_dispatcher')->dispatch('user.file.uploaded', $fileUploadedEvent);

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($user);
        $manager->flush();

        return new JsonResponse('Success.', JsonResponse::HTTP_OK);
    }
}
