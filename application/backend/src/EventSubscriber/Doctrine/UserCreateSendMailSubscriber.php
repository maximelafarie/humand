<?php
declare(strict_types=1);

namespace App\EventSubscriber\Doctrine;

use App\Entity\User;
use App\Mail\RegisterPasswordMail;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

class UserCreateSendMailSubscriber implements EventSubscriber
{
    private RegisterPasswordMail $registerPasswordMail;

    public function __construct(RegisterPasswordMail $registerPasswordMail)
    {
        $this->registerPasswordMail = $registerPasswordMail;
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

        $this->registerPasswordMail->send([
            'user' => $user,
        ]);
    }

}
