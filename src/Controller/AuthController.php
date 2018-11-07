<?php

namespace App\Controller;


use App\Form\RegistrationForm;
use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends controller
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
            'token' => $token,
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
}