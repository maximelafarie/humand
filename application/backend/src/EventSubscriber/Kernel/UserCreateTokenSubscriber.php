<?php

declare(strict_types=1);

namespace App\EventSubscriber\Kernel;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Utils\RandomTokenGenerator;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class UserCreateTokenSubscriber implements EventSubscriberInterface
{
    private RandomTokenGenerator $generator;

    public function __construct(RandomTokenGenerator $generator)
    {
        $this->generator = $generator;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['initializeTokenOnnUserCreate', EventPriorities::PRE_WRITE],
        ];
    }

    public function initializeTokenOnnUserCreate(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $route = $event->getRequest()->attributes->get('_route');

        if (!$user instanceof User || 'api_users_post_collection' !== $route) {
            return;
        }

        if (!\is_null($user->getPassword())) {
            return;
        }

        $user->setConfirmationToken($this->generator->generateToken());
    }
}
