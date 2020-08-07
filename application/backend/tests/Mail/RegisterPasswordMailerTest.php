<?php

namespace App\Tests\Mail;

use App\Entity\User;
use App\Mail\RegisterPasswordMailer;
use App\Mailer\AbstractMailer;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegisterPasswordMailerTest extends TestCase
{
    private RegisterPasswordMailer $mailer;

    /**
     * @var TranslatorInterface|ObjectProphecy
     */
    private $translator;

    public function setUp()
    {
        $this->translator = $this->prophesize(TranslatorInterface::class);

        $this->mailer = new RegisterPasswordMailer(
            $this->prophesize(MailerInterface::class)->reveal(),
            $this->translator->reveal(),
            'activateFrontRouting'
        );
    }

    public function testItIsInstanceOfAbstractMailer()
    {
        $this->assertInstanceOf(AbstractMailer::class, $this->mailer);
    }

    public function testItThrowExceptionIfNotAUser()
    {
        $this->expectException(\LogicException::class);
        $this->expectExceptionMessage('user paremeter need to be an instance of ' . User::class);

        $this->mailer->create(['user' => 'foo']);
    }

    public function testItCreateMail()
    {
        $user = new User();
        $user->setEmail('foo@yopmail.com');
        $user->setConfirmationToken('fooToken');

        $this->translator->trans('email.activate_account.subject')->shouldBeCalled()->willReturn('fooSubject');
        $this->translator->trans('email.activate_account.action_text')->shouldBeCalled()->willReturn('fooActionText');

        $mail = $this->mailer->create(['user' => $user]);

        $this->assertEquals($mail->getSubject(), 'fooSubject');
        $this->assertEquals($mail->getHtmlTemplate(), 'emails/activate-account.html.twig');
        $this->assertEquals($mail->getFrom()[0]->getAddress(), 'admin@humand.test');
        $this->assertEquals($mail->getTo()[0]->getAddress(), 'foo@yopmail.com');
        $this->assertEquals($mail->getContext(), [
            'action_url' => 'activateFrontRouting/fooToken',
            'action_text' => 'fooActionText',
            'user' => $user,
        ]);
    }
}
