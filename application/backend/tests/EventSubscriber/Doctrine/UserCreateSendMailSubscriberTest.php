<?php
declare(strict_types=1);

namespace App\Tests\EventSubscriber\Doctrine;

use App\Entity\User;
use App\EventSubscriber\Doctrine\UserCreateSendMailSubscriber;
use App\Mail\RegisterPasswordMail;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;

class UserCreateSendMailSubscriberTest extends TestCase
{
    /**
     * @var RegisterPasswordMail|ObjectProphecy
     */
    private $registerPasswordMail;

    /**
     * @var UserCreateSendMailSubscriber
     */
    private $sub;

    public function setUp()
    {
        $this->registerPasswordMail = $this->prophesize(RegisterPasswordMail::class);

        $this->sub = new UserCreateSendMailSubscriber($this->registerPasswordMail->reveal());
    }

    public function testItIsAnDoctrineEventSubscriberInterface()
    {
        $this->assertInstanceOf(EventSubscriber::class, $this->sub);
    }

    public function testItIsCalledOnEvents()
    {
        $this->assertEquals(
            $this->sub->getSubscribedEvents(),
            [
                Events::postPersist,
            ]
        );
    }

    public function testItSendEmailOnPostPersist()
    {
        $user = $this->prophesize(User::class);
        $event = $this->prophesize(LifecycleEventArgs::class);

        $user->getConfirmationToken()->shouldBeCalled()->willReturn(null);
        $event->getObject()->shouldBeCalled()->willReturn($user->reveal());

        $this->assertNull($this->sub->postPersist($event->reveal()));

        $user->getConfirmationToken()->shouldBeCalled()->willReturn('foo');
        $this->registerPasswordMail->send(['user' => $user])->shouldBeCalled();

        $this->sub->postPersist($event->reveal());
    }

}
