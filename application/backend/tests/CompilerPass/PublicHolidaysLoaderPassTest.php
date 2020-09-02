<?php

declare(strict_types=1);

namespace App\Tests\CompilerPass;

use App\CompilerPass\PublicHolidaysLoaderPass;
use App\PublicHolidaysService\PublicHolidaysRegistry;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;

class PublicHolidaysLoaderPassTest extends TestCase
{
    public function testItIsACompilerPass()
    {
        $pass = new PublicHolidaysLoaderPass();
        $this->assertInstanceOf(CompilerPassInterface::class, $pass);
    }

    public function testItCallMethodAdd()
    {
        $definition = $this->prophesize(Definition::class);
        $definition->addMethodCall('addFilter', [new Reference('foo_bar')]);

        $container = $this->prophesize(ContainerBuilder::class);
        $container->has(PublicHolidaysRegistry::class)->shouldBeCalled()->willReturn(true);
        $container->findDefinition(PublicHolidaysRegistry::class)->shouldBeCalled()->willReturn($definition);

        $container->findTaggedServiceIds(PublicHolidaysLoaderPass::TAG_ID)->shouldBeCalled()->willReturn([
            'foo' => 'bar',
        ]);

        (new PublicHolidaysLoaderPass())->process($container->reveal());
    }
}
