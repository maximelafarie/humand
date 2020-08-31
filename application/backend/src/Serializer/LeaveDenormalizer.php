<?php

namespace App\Serializer;

use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\Leave;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class LeaveDenormalizer implements DenormalizerInterface
{
    private IriConverterInterface $iriConverter;
    private Security $security;
    private DenormalizerInterface $normalizer;

    public function __construct(IriConverterInterface $iriConverter, Security $security, DenormalizerInterface $denormalizer)
    {
        $this->iriConverter = $iriConverter;
        $this->security = $security;
        $this->normalizer = $denormalizer;
    }
    
    public function denormalize($data, string $type, string $format = null, array $context = [])
    {
        $data['author'] = $this->iriConverter->getIriFromItem($this->security->getUser());

        return $this->normalizer->denormalize($data, $type, $format, $context);
    }

    public function supportsDenormalization($data, string $type, string $format = null)
    {
        return is_array($data) && Leave::class === $type;
    }
}
