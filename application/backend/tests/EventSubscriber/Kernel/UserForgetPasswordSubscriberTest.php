<?php
declare(strict_types=1);

namespace App\Tests\EventSubscriber\Kernel;

use App\Entity\User;
use App\Event\UserEvent;
use App\EventSubscriber\Kernel\UserForgetPasswordSubscriber;
use App\Mail\ForgetPasswordMail;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserForgetPasswordSubscriberTest extends TestCase
{
    /**
     * @var ForgetPasswordMail|ObjectProphecy
     */
    private $forgetPasswordMail;

    /**
     * @var UserForgetPasswordSubscriber
     */
    private $sub;

    public function setUp()
    {
        $this->forgetPasswordMail = $this->prophesize(ForgetPasswordMail::class);

        $this->sub = new UserForgetPasswordSubscriber($this->forgetPasswordMail->reveal());
    }

    public function testItIsAnEventSubscriberInterface()
    {
        $this->assertInstanceOf(EventSubscriberInterface::class, $this->sub);
    }

    public function testItIsCalledOnEvents()
    {
        $this->assertEquals(
            UserForgetPasswordSubscriber::getSubscribedEvents(),
            [
                UserEvent::RESET_TOKEN => ['sendEmail'],
            ]
        );
    }

    public function testItSendEmail()
    {
        $user = new User();
        $this->forgetPasswordMail->send(['user' => $user])->shouldBeCalled();

        $this->sub->sendEmail(new UserEvent($user));
    }

}
