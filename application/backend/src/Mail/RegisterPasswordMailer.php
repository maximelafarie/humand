<?php
declare(strict_types=1);

namespace App\Mail;

use App\Entity\User;
use App\Mailer\AbstractMailer;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegisterPasswordMailer extends AbstractMailer
{
    private string $activateFrontRouting;
    private TranslatorInterface $translator;

    public function __construct(MailerInterface $mailer, TranslatorInterface $translator, string $activateFrontRouting)
    {
        parent::__construct($mailer);
        $this->translator = $translator;
        $this->activateFrontRouting = $activateFrontRouting;
    }

    public function create(array $parameters = [])
    {
        /** @var User $user */
        $user = $parameters['user'];

        if (!$user instanceof User) {
            throw new \LogicException('user paremeter need to be an instance of ' . User::class);
        }

        return (new TemplatedEmail())
            ->subject($this->translator->trans('email.activate_account.subject'))
            ->htmlTemplate('emails/activate-account.html.twig')
            ->from('admin@humand.test')
            ->to($user->getEmail())
            ->context([
                'action_url'  => $this->activateFrontRouting.'/'.$user->getConfirmationToken(),
                'action_text' => $this->translator->trans('email.activate_account.action_text'),
                'user'        => $user,
            ])
        ;
    }
}
