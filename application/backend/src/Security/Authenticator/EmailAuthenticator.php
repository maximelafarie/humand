<?php

declare(strict_types=1);

namespace App\Security\Authenticator;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class EmailAuthenticator extends AbstractGuardAuthenticator
{
    public function start(Request $request, AuthenticationException $authException = null)
    {
        if (null === $authException) {
            return;
        }

        if ($authException instanceof AuthenticationCredentialsNotFoundException) {
            throw new UnauthorizedHttpException('Email', 'Bad credentials.', $authException);
        }

        throw $authException;
    }

    public function supports(Request $request)
    {
        return 1 === \preg_match('/forget-password$/', $request->getPathInfo()) && $this->isAllowedRequest($request);
    }

    public function getCredentials(Request $request)
    {
        $body = $request->getContent();

        if (empty($body)) {
            throw new PreconditionFailedHttpException('l\'email est obligatoire');
        }

        $payload = \json_decode($body);

        if (!isset($payload->email)) {
            throw new PreconditionFailedHttpException('l\'email est obligatoire');
        }

        return [
            'email' => $payload->email,
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $userProvider->loadUserByUsername($credentials['email']);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        throw new UnauthorizedHttpException('Email', $exception->getMessage());
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
    }

    public function supportsRememberMe()
    {
        return false;
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
