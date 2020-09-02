<?php

declare(strict_types=1);

namespace App\Mailer;

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;

abstract class AbstractMailer
{
    protected MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * Return a message to send.
     *
     * @return mixed
     */
    abstract public function create(array $parameters = []);

    public function send(array $parameters = [])
    {
        $message = $this->create($parameters);

        try {
            $this->mailer->send($message);
        } catch (TransportExceptionInterface $e) {
            throw new MailerException('Send email failure');
        }

        return true;
    }
}
