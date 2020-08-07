<?php

namespace App\Tests\Serializer;

use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\Leave;
use App\Entity\User;
use App\Serializer\LeaveDenormalizer;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class LeaveDenormalizerTest extends TestCase
{
    private LeaveDenormalizer $denormalizer;

    /**
     * @var IriConverterInterface|ObjectProphecy
     */
    private $iriConverter;

    /**
     * @var Security|ObjectProphecy
     */
    private $security;

    /**
     * @var DenormalizerInterface|ObjectProphecy
     */
    private $normalizer;

    public function setUp()
    {
        $this->iriConverter = $this->prophesize(IriConverterInterface::class);
        $this->security = $this->prophesize(Security::class);
        $this->normalizer = $this->prophesize(DenormalizerInterface::class);

        $this->denormalizer = new LeaveDenormalizer(
            $this->iriConverter->reveal(),
            $this->security->reveal(),
            $this->normalizer->reveal()
        );
    }

    public function testItIsInstanceOfDenormalizer()
    {
        $this->assertInstanceOf(DenormalizerInterface::class, $this->denormalizer);
    }

    public function testItDontSupportsDenormalizationIfNotArray()
    {
        $this->assertFalse($this->denormalizer->supportsDenormalization('foo', Leave::class));
    }

    public function testItDontSupportsDenormalizationIfNotLeaveClasse()
    {
        $this->assertFalse($this->denormalizer->supportsDenormalization([], \stdClass::class));
    }

    public function testItSupportsDenormalizationIfArrayAndLeave()
    {
        $this->assertTrue($this->denormalizer->supportsDenormalization([], Leave::class));
    }

    public function testItAddAuthorToData()
    {
        $user = new User();
        $this->security->getUser()->shouldBeCalled()->willReturn($user);
        $this->iriConverter->getIriFromItem($user)->shouldBeCalled();
        $this->denormalizer->denormalize([], Leave::class);
    }
}