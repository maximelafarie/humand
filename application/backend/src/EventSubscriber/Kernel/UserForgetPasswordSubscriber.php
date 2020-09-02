<?php

declare(strict_types=1);

namespace App\EventSubscriber\Kernel;

use App\Entity\User;
use App\Event\UserEvent;
use App\Mail\ForgetPasswordMailer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserForgetPasswordSubscriber implements EventSubscriberInterface
{
    private ForgetPasswordMailer $forgetPasswordMailer;

    public function __construct(ForgetPasswordMailer $forgetPasswordMailer)
    {
        $this->forgetPasswordMailer = $forgetPasswordMailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            UserEvent::RESET_TOKEN => ['sendEmail'],
        ];
    }

    /**
     * Send email with confirmationToken.
     *
     * @throws \App\Mailer\MailerException
     */
    public function sendEmail(UserEvent $userEvent)
    {
        $user = $userEvent->getUser();

        if (!$user instanceof User) {
            return;
        }

        $this->forgetPasswordMailer->send([
            'user' => $user,
        ]);
    }
}
