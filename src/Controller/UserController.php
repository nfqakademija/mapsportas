<?php

namespace App\Controller;

use App\Form\RegistrationForm;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
        $this->userManager->updateUser($user);

        return new JsonResponse([
            'success_message' => 'Successfully updated user'
        ]);
    }

    /**
     * @Route("api/user", name="api_user", methods="GET")
     */
    public function getCurrentUser(Request $request)
    {
        $user = $this->getUser();
        return new JsonResponse([
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'name' => $user->getName(),
            'surname' => $user->getSurname(),
            'birthDate' => $user->getBirthDate(),
            'roles' => $user->getRoles()
        ]);
    }

}
