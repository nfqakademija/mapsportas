<?php

namespace App\Controller;

use App\Form\RegistrationForm;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegisterController extends controller
{
    /**
     * @var UserManagerInterface
     */
    private $userManager;

    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var JWTEncoderInterface
     */
    private $jwtEncoder;

    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(ValidatorInterface $validator, AuthorizationCheckerInterface $authorizationChecker, UserManagerInterface $userManager,EventDispatcherInterface $dispatcher, TokenStorageInterface $tokenStorage, JWTEncoderInterface $jwtEncoder)
    {
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
        $this->tokenStorage = $tokenStorage;
        $this->jwtEncoder = $jwtEncoder;
        $this->authorizationChecker = $authorizationChecker;
        $this->validator = $validator;
    }

    /**
     * @Route("/api/login_check")
     */
    public function authentication(Request $request)
    {
//
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
        if (!($form->isSubmitted() && $form->isValid())) {
            $errors = $this->validator->validate($user);
            if (count($errors) > 0) {
                return new JsonResponse([
                    'error_message' => $errors->get(0)->getMessage(),
                ], Response::HTTP_BAD_REQUEST);
            }
        }
        try {
            $this->userManager->updateUser($user);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully updated user'
        ]);
    }
}