<?php

namespace App\Serializer;

use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\Api\OperationType;
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
        $userIri = $this->iriConverter->getIriFromItem($this->security->getUser());
        if ($context['collection_operation_name'] === 'post') {
            $array = [];
            foreach ($data['leavesArray'] as $leaveArray) {
                $leaveArray['author'] = $userIri;
                $array[] = $this->normalizer->denormalize($leaveArray, $type, $format, $context);
            }
        }

        return $array;
    }

    public function supportsDenormalization($data, string $type, string $format = null)
    {
        return is_array($data) && Leave::class === $type;
    }
}
