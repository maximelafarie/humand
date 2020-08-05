<?php
declare(strict_types=1);

namespace App\Controller;

use App\Event\UserEvent;
use App\Utils\RandomTokenGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class ForgetPasswordAction extends AbstractController
{
    private RandomTokenGenerator $tokenGenerator;
    private EventDispatcherInterface $eventDispatcher;

    public function __construct(RandomTokenGenerator $tokenGenerator, EventDispatcherInterface $eventDispatcher)
    {
        $this->eventDispatcher = $eventDispatcher;
        $this->tokenGenerator = $tokenGenerator;
    }

    public function __invoke()
    {
        $user       = $this->getUser();
        $token = $this->tokenGenerator->generateToken();

        $user->setConfirmationToken($token);

        $event = new UserEvent($user);
        $this->eventDispatcher->dispatch($event, UserEvent::RESET_TOKEN);

        return $user;
    }
}
