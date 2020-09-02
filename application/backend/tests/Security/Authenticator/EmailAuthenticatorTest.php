<?php

declare(strict_types=1);

namespace App\Tests\Security\Authenticator;

use App\Security\Authenticator\EmailAuthenticator;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class EmailAuthenticatorTest extends TestCase
{
    private EmailAuthenticator $authenticator;

    protected function setUp()
    {
        $this->authenticator = new EmailAuthenticator();
    }

    public function testGetCredentialsFailedWithoutEmail()
    {
        $this->expectException(PreconditionFailedHttpException::class);

        $request = new Request([], [], [], [], [], [], null);
        $credentials = $this->authenticator->getCredentials($request);

        $this->assertNull($credentials);
    }

    public function testGetCredentialsSuccess()
    {
        $body = \json_encode(['email' => 'foo@bar.fr']);
        $request = new Request([], [], [], [], [], [], $body);
        $credentials = $this->authenticator->getCredentials($request);

        $this->assertSame($credentials, [
            'email' => 'foo@bar.fr',
        ]);
    }

    public function testGetUser()
    {
        $credentials = [
            'email' => 'foo@bar.fr',
        ];

        $userProvider = $this->prophesize(UserProviderInterface::class);
        $userProvider->loadUserByUsername('foo@bar.fr')->shouldBeCalled();

        $this->authenticator->getUser($credentials, $userProvider->reveal());
    }

    public function testCheckCredentials()
    {
        $credentials = [];
        $user = $this->prophesize(UserInterface::class);

        $result = $this->authenticator->checkCredentials($credentials, $user->reveal());
        $this->assertTrue($result);
    }

    public function testOnAuthenticationFailure()
    {
        $request = new Request([], [], [], [], [], [], null);

        $this->expectException(UnauthorizedHttpException::class);

        $exception = $this->prophesize(AuthenticationException::class);
        $this->authenticator->onAuthenticationFailure($request, $exception->reveal());
    }

    public function testSupportsRememberMe()
    {
        $remember = $this->authenticator->supportsRememberMe();
        $this->assertFalse($remember);
    }

    public function testStart()
    {
        $request = new Request([], [], [], [], [], [], null);

        $result = $this->authenticator->start($request, null);
        $this->assertNull($result);

        $this->expectException(UnauthorizedHttpException::class);
        $exception = $this->prophesize(AuthenticationCredentialsNotFoundException::class);
        $this->authenticator->start($request, $exception->reveal());

        $this->expectException(AuthenticationException::class);
        $exception = $this->prophesize(AuthenticationException::class);
        $this->authenticator->start($request, $exception->reveal());
    }

    public function testSupports()
    {
        $server = ['REQUEST_URI' => 'forget-password', 'REQUEST_METHOD' => 'POST'];
        $request = new Request([], [], [], [], [], $server, null);
        $result = $this->authenticator->supports($request);
        $this->assertTrue($result);

        $server = ['REQUEST_URI' => 'forget-password', 'REQUEST_METHOD' => 'PUT'];
        $request = new Request([], [], [], [], [], $server, null);
        $result = $this->authenticator->supports($request);
        $this->assertFalse($result);

        $server = ['REQUEST_URI' => 'bad-request', 'REQUEST_METHOD' => 'POST'];
        $request = new Request([], [], [], [], [], $server, null);
        $result = $this->authenticator->supports($request);
        $this->assertFalse($result);
    }
}
