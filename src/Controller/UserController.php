<?php

namespace App\Controller;

use App\Form\RegistrationForm;
use FOS\UserBundle\Model\UserManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationSuccessResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Symfony\Component\Security\Core\User\UserInterface;


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
     * @Route("/api/register", name="register", methods="POST")
     */
    public function register(Request $request)
    {
        $user = $this->userManager->createUser();
        $data = json_decode($request->getContent(),true);
        $form = $this->createForm(RegistrationForm::class,$user);
        $form->submit($data,false);
        $user->setPlainPassword($data["password"]);
        $user->setEnabled(1);
        $this->userManager->updateUser($user);
        $token = $this->getTokenUser($user);

        return new JsonResponse([
            "username" => $user->getUsername(),
            "email" => $user->getEmail(),
            "name" => $user->getName(),
            "surname" => $user->getSurname(),
            "birthDate" => $user->getBirthDate(),
            "token" => $token
        ]);
    }

    /**
     * @Route("/api/login", name="login", methods="POST")
     */
    public function login(Request $request)
    {
        $data = json_decode($request->getContent(),true);
        $user = $this->userManager->findUserByUsername($data['username']);
        if (!$user) {
            return new JsonResponse([
                'error_message' => 'Bad credentials'
            ], Response::HTTP_BAD_REQUEST);
        }


        $isValid = $this->get('security.password_encoder')->isPasswordValid($user, $data['password']);
        if (!$isValid) {
            return new JsonResponse([
                'error_message' => 'Bad credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }


        $token = $this->getTokenUser($user);

        return new JsonResponse([
            "username" => $user->getUsername(),
            "email" => $user->getEmail(),
            "name" => $user->getName(),
            "surname" => $user->getSurname(),
            "birthDate" => $user->getBirthDate(),
            'token' => $token,
        ]);
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
            'success_message' => 'Successfully updated user',
            "username"=>$user->getUsername(),
            "email"=>$user->getEmail(),
            "name"=>$user->getName(),
            "surname"=>$user->getSurname(),
            "birthDate"=>$user->getBirthDate()
        ]);
    }

    private function getTokenUser(UserInterface $user)
    {
        $jwtManager = $this->get('lexik_jwt_authentication.jwt_manager');
        $token = $jwtManager->create($user);
        $response = new JsonResponse();
        new AuthenticationSuccessEvent(array('token' => $token), $user, $response);

        return $token;
    }

    /**
     * @Route("api/test", name="api_test", methods="GET")
     */
    public function test()
    {
        return new JsonResponse([
            'success_message' => 'Successfully passed test',
        ]);
    }
}