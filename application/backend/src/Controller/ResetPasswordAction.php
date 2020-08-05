<?php
declare(strict_types=1);

namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ResetPasswordAction extends AbstractController
{
    private JWTTokenManagerInterface $JWTManager;
    private ValidatorInterface $validator;
    private EntityManagerInterface $entityManager;

    public function __construct(
        JWTTokenManagerInterface $JWTManager,
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager
    ) {
        $this->JWTManager = $JWTManager;
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request)
    {
        $user = $this->getUser();

        $parameters = \json_decode($request->getContent());

        $user->setPassword($parameters->password ?? null);

        $this->validator->validate($user, ['groups' => 'reset_password']);

        $user->setPassword(null);
        $user->setPlainPassword($parameters->password);

        $user->setConfirmationToken(null);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['token' => $this->JWTManager->create($user)]);
    }
}
