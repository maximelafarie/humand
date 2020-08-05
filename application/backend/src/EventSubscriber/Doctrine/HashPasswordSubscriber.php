<?php
declare(strict_types=1);

namespace App\EventSubscriber\Doctrine;

use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class HashPasswordSubscriber implements EventSubscriber
{
    private EncoderFactoryInterface $encoderFactory;

    public function __construct(EncoderFactoryInterface $encoderFactory)
    {
        $this->encoderFactory = $encoderFactory;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    /**
     * Encode user password if set.
     *
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof User) {
            return;
        }

        $this->encodePassword($entity);
    }

    /**
     * Encode User password if new one is set.
     *
     * @param LifecycleEventArgs $args
     */
    public function preUpdate(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof User) {
            return;
        }

        $this->encodePassword($entity);
    }

    /**
     * @param User $user
     */
    private function encodePassword(User $user)
    {
        // No password to encode
        if (\is_null($user->getPlainPassword())) {
            return;
        }

        $encoder = $this->encoderFactory->getEncoder($user);

        $encoded = $encoder->encodePassword(
            $user->getPlainPassword(),
            $user->getSalt()
        );

        $user->setPassword($encoded);
        $user->eraseCredentials();
    }
}
