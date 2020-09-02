<?php

declare(strict_types=1);

namespace App\Serializer;

use Knp\DictionaryBundle\Dictionary;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class DictionaryNormalizer implements NormalizerInterface
{
    public function normalize($object, string $format = null, array $context = [])
    {
        $dictionary = [];

        if (isset($context['operation_type']) && 'item' === $context['operation_type']) {
            $dictionary['context'] = '/api/contexts/Dictionary';
        }

        $dictionary = \array_merge($dictionary, [
            '@id' => '/api/dictionaries/' . $object->getName(),
            '@type' => 'Dictionary',
            'name' => $object->getName(),
            'entries' => \array_map(
                function ($id, $text) {
                    return ['key' => $id, 'value' => $text];
                },
                $object->getKeys(),
                $object->getValues()
            ),
        ]);

        return $dictionary;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, string $format = null)
    {
        return \is_object($data) && $data instanceof Dictionary;
    }
}
