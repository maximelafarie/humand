<?php
declare(strict_types=1);

namespace App\Tests\EventSubscriber\Doctrine;

use App\Entity\User;
use App\EventSubscriber\Doctrine\HashPasswordSubscriber;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use PHPUnit\Framework\TestCase;
use Prophecy\Argument;
use Prophecy\Prophecy\ObjectProphecy;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;

class HashPasswordSubscriberTest extends TestCase
{
    /**
     * @var EncoderFactoryInterface|ObjectProphecy
     */
    private $encoderFactory;

    /**
     * @var HashPasswordSubscriber
     */
    private $sub;

    public function setUp()
    {
        $this->encoderFactory = $this->prophesize(EncoderFactoryInterface::class);

        $this->sub = new HashPasswordSubscriber($this->encoderFactory->reveal());
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
                Events::prePersist,
                Events::preUpdate,
            ]
        );
    }

    /**
     * @dataProvider methods
     */
    public function testItEncodePassword(string $method)
    {
        $user = $this->prophesize(User::class);
        $event = $this->prophesize(LifecycleEventArgs::class);
        $encoder = $this->prophesize(PasswordEncoderInterface::class);

        $event->getObject()->shouldBeCalled()->willReturn($user->reveal());
        $user->getPlainPassword()->shouldBeCalled()->willReturn(null);

        $this->assertNull($this->sub->$method($event->reveal()));

        $user->getPlainPassword()->shouldBeCalled()->willReturn('foo');
        $user->getSalt()->shouldBeCalled();
        $this->encoderFactory->getEncoder($user->reveal())->shouldBeCalled()->willReturn($encoder->reveal());
        $encoder->encodePassword(Argument::cetera())->shouldBeCalled()->willReturn('encodedPassword');

        $user->setPassword('encodedPassword')->shouldBeCalled();
        $user->eraseCredentials()->shouldBeCalled();

        $this->sub->$method($event->reveal());
    }

    public function methods()
    {
        return [
            [Events::prePersist],
            [Events::preUpdate],
        ];
    }

}
