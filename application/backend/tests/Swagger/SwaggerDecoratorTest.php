<?php
declare(strict_types=1);

namespace App\Tests\Swagger;

use App\Swagger\SwaggerDecorator;
use PHPUnit\Framework\TestCase;
use Prophecy\Argument;
use Prophecy\Prophecy\ObjectProphecy;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class SwaggerDecoratorTest extends TestCase
{
    /**
     * @var NormalizerInterface|ObjectProphecy
     */
    private $normalizer;

    private SwaggerDecorator $swagger;

    public function setUp()
    {
        $this->normalizer = $this->prophesize(NormalizerInterface::class);

        $this->swagger = new SwaggerDecorator($this->normalizer->reveal());
    }

    public function testItIsAnNormalizerInteraface()
    {
        $this->assertInstanceOf(NormalizerInterface::class, $this->swagger);
    }

    public function testItNormalizeNewTokenPath()
    {
        $this->normalizer->normalize(Argument::cetera())->shouldBeCalled()->willReturn([]);

        $result = $this->swagger->normalize(Argument::cetera());

        $this->assertArrayHasKey('paths', $result);
        $this->assertArrayHasKey('/api/token', $result['paths']);
    }
}
