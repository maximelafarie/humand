<?php
declare(strict_types=1);

namespace App\Mail;

use App\Entity\User;
use App\Mailer\AbstractMailer;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class ForgetPasswordMail extends AbstractMailer
{
    private $resetFrontRouting;
    private $translator;

    public function __construct(MailerInterface $mailer, TranslatorInterface $translator, string $resetFrontRouting)
    {
        parent::__construct($mailer);
        $this->translator = $translator;
        $this->resetFrontRouting = $resetFrontRouting;
    }

    public function create(array $parameters = [])
    {
        /** @var User $user */
        $user = $parameters['user'];

        if (!$user instanceof User) {
            throw new \LogicException('user paremeter need to be an instance of ' . User::class);
        }

        return (new TemplatedEmail())
            ->subject($this->translator->trans('email.forget_password.subject'))
            ->htmlTemplate('emails/forget-password.html.twig')
            ->from('admin@humand.test')
            ->to($user->getEmail())
            ->context([
                'action_url'  => $this->resetFrontRouting,
                'action_text' => $this->translator->trans('email.forget_password.action_text'),
                'user'        => $user,
            ])
        ;
    }
}
