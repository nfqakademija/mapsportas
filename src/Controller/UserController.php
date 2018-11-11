<?php

namespace App\Controller;

use App\Form\RegistrationForm;
use FOS\UserBundle\Model\UserManagerInterface;
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
     * @Route("api/user/edit", name="api_user_edit", methods="PUT")
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
        ],Response::HTTP_OK);
    }

    /**
     * @Route("api/user", name="api_user", methods="GET")
     */
    public function getCurrentUser()
    {
        $user = $this->getUser();
        return new JsonResponse([
            'user' => [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'birthDate' => $user->getBirthDate()->format('Y-m-d'),
                'roles' => $user->getRoles(),
                'createdAt' => $user->getCreatedAt(),
                'updatedAt' => $user->getUpdatedAt()
            ]
        ],Response::HTTP_OK);
    }

    /**
     * @Route("api/admin/promote", name="promote_to_admin", methods="GET")
     */
    public function promoteToAdmin(Request $request)
    {
        $user = $this->getUser();
        $user->addRole("ROLE_ADMIN");
        $this->userManager->updateUser($user);

        return new JsonResponse([
            'success_message' => 'Successfully promoted user'
        ],Response::HTTP_OK);

    }
}
