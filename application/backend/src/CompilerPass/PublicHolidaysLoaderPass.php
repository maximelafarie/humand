<?php

declare(strict_types=1);

namespace App\CompilerPass;

use App\PublicHolidaysService\PublicHolidaysRegistry;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class PublicHolidaysLoaderPass implements CompilerPassInterface
{
    const TAG_ID = 'app.public_holidays';

    public function process(ContainerBuilder $container)
    {
        if (!$container->has(PublicHolidaysRegistry::class)) {
            return;
        }

        $definition = $container->findDefinition(PublicHolidaysRegistry::class);
        $taggedServices = $container->findTaggedServiceIds(self::TAG_ID);

        foreach ($taggedServices as $id => $tags) {
            $definition->addMethodCall('add', array(new Reference($id)));
        }
    }
}
