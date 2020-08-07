<?php
declare(strict_types=1);

namespace App\Tests\EventSubscriber\Kernel;

use App\Entity\User;
use App\Event\UserEvent;
use App\EventSubscriber\Kernel\UserForgetPasswordSubscriber;
use App\Mail\ForgetPasswordMailer;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserForgetPasswordSubscriberTest extends TestCase
{
    /**
     * @var ForgetPasswordMailer|ObjectProphecy
     */
    private $forgetPasswordMailer;

    private UserForgetPasswordSubscriber $sub;

    public function setUp()
    {
        $this->forgetPasswordMailer = $this->prophesize(ForgetPasswordMailer::class);

        $this->sub = new UserForgetPasswordSubscriber($this->forgetPasswordMailer->reveal());
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
        $this->forgetPasswordMailer->send(['user' => $user])->shouldBeCalled();

        $this->sub->sendEmail(new UserEvent($user));
    }

}
