<?php

declare(strict_types=1);

namespace App\EventSubscriber\Doctrine;

use App\Entity\User;
use App\Mail\RegisterPasswordMailer;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

class UserCreateSendMailSubscriber implements EventSubscriber
{
    private RegisterPasswordMailer $registerPasswordMailer;

    public function __construct(RegisterPasswordMailer $registerPasswordMailer)
    {
        $this->registerPasswordMailer = $registerPasswordMailer;
    }

    public function getSubscribedEvents()
    {
        return [
            Events::postPersist,
        ];
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $user = $args->getObject();

        if (!$user instanceof User) {
            return;
        }

        if (\is_null($user->getConfirmationToken())) {
            return;
        }

        $this->registerPasswordMailer->send([
            'user' => $user,
        ]);
    }
}
