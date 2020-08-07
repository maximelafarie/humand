<?php
declare(strict_types=1);

namespace App\Tests\EventSubscriber\Kernel;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\EventSubscriber\Kernel\UserCreateTokenSubscriber;
use App\Utils\RandomTokenGenerator;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class UserCreateTokenSubscriberTest extends TestCase
{
    /**
     * @var RandomTokenGenerator|ObjectProphecy
     */
    private $generator;

    private UserCreateTokenSubscriber $sub;

    public function setUp()
    {
        $this->generator = $this->prophesize(RandomTokenGenerator::class);

        $this->sub = new UserCreateTokenSubscriber($this->generator->reveal());
    }

    public function testItIsAnEventSubscriberInterface()
    {
        $this->assertInstanceOf(EventSubscriberInterface::class, $this->sub);
    }

    public function testItIsCalledOnEvents()
    {
        $this->assertEquals(
            UserCreateTokenSubscriber::getSubscribedEvents(),
            [
                KernelEvents::VIEW  => ['initializeTokenOnnUserCreate', EventPriorities::PRE_WRITE],
            ]
        );
    }

    public function testItInitializeTokenOnUserCreate()
    {
        $user = $this->prophesize(User::class);

        $request = new Request([], [], ['_route' => 'api_users_post_collection']);
        $event = new ViewEvent($this->prophesize(HttpKernelInterface::class)->reveal(), $request, HttpKernelInterface::MASTER_REQUEST, $user->reveal());

        $this->generator->generateToken()->shouldBeCalled()->willReturn('foo');
        $user->getPassword()->shouldBeCalled()->willReturn(null);
        $user->setConfirmationToken('foo')->shouldBeCalled();

        $this->sub->initializeTokenOnnUserCreate($event);
    }

}
