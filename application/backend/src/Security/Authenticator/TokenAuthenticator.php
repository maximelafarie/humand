<?php

declare(strict_types=1);

namespace App\Security\Authenticator;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class TokenAuthenticator extends AbstractGuardAuthenticator
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getCredentials(Request $request)
    {
        if (!$request->attributes->has('token')) {
            throw new PreconditionFailedHttpException('token parameter is missing');
        }

        return ['token' => $request->attributes->get('token')];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $this->userRepository->findOneBy(['confirmationToken' => $credentials['token']]);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        throw new UnauthorizedHttpException('Token', 'Token non valide');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
    }

    public function supportsRememberMe()
    {
        return false;
    }

    public function start(Request $request, AuthenticationException $exception = null)
    {
        if (null === $exception) {
            return;
        }

        if ($exception instanceof AuthenticationCredentialsNotFoundException) {
            throw new UnauthorizedHttpException('Token', 'Bad credentials.', $exception);
        }

        throw $exception;
    }

    public function supports(Request $request)
    {
        return 1 === \preg_match('/reset-password/', $request->getPathInfo()) && $this->isAllowedRequest($request);
    }

    /**
     * @return bool
     */
    private function isAllowedRequest(Request $request)
    {
        return \in_array(
            $request->getMethod(),
            [
                Request::METHOD_POST,
            ]
        );
    }
}
