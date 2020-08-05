<?php
declare(strict_types=1);

namespace App\EventSubscriber\Kernel;

use App\Entity\User;
use App\Event\UserEvent;
use App\Mail\ForgetPasswordMail;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserForgetPasswordSubscriber implements EventSubscriberInterface
{
    private ForgetPasswordMail $forgetPasswordMail;

    public function __construct(ForgetPasswordMail $forgetPasswordMail)
    {
        $this->forgetPasswordMail = $forgetPasswordMail;
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
     * @param UserEvent $userEvent
     *
     * @throws \App\Mailer\MailerException
     */
    public function sendEmail(UserEvent $userEvent)
    {
        $user = $userEvent->getUser();

        if (!$user instanceof User) {
            return;
        }

        $this->forgetPasswordMail->send([
            'user' => $user,
        ]);
    }
}
