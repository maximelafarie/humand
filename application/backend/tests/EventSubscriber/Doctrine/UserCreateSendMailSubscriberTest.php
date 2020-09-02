<?php

declare(strict_types=1);

namespace App\Tests\EventSubscriber\Doctrine;

use App\Entity\User;
use App\EventSubscriber\Doctrine\UserCreateSendMailSubscriber;
use App\Mail\RegisterPasswordMailer;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;

class UserCreateSendMailSubscriberTest extends TestCase
{
    /**
     * @var RegisterPasswordMailer|ObjectProphecy
     */
    private $registerPasswordMailer;

    private UserCreateSendMailSubscriber $sub;

    public function setUp()
    {
        $this->registerPasswordMailer = $this->prophesize(RegisterPasswordMailer::class);

        $this->sub = new UserCreateSendMailSubscriber($this->registerPasswordMailer->reveal());
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
        $this->registerPasswordMailer->send(['user' => $user])->shouldBeCalled();

        $this->sub->postPersist($event->reveal());
    }
}
