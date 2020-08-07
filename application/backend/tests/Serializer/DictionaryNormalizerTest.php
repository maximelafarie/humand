<?php

namespace App\Tests\Serializer;

use App\Dictionary\Dictionary\SimpleDictionary;
use App\Serializer\DictionaryNormalizer;
use Knp\DictionaryBundle\Dictionary;
use PHPUnit\Framework\TestCase;

class DictionaryNormalizerTest extends TestCase
{
    private DictionaryNormalizer $normalizer;

    private SimpleDictionary $dictionary;

    public function setUp()
    {
        $this->dictionary = new SimpleDictionary('fooName', ['foo' => 'Foo', 'bar' => 'Bar']);
        $this->normalizer = new DictionaryNormalizer();
    }

    public function testItSupportsDictionaryObject()
    {
        $this->assertFalse($this->normalizer->supportsNormalization(new \stdClass()));
        $this->assertFalse($this->normalizer->supportsNormalization('foo'));
        $this->assertTrue($this->normalizer->supportsNormalization($this->dictionary));
    }

    public function testItNormalizeCorrectly()
    {
        $returnArray = [
            '@id' => '/api/dictionaries/fooName',
            '@type' => 'Dictionary',
            'name' => 'fooName',
            'entries' => [
                [
                    'key' => 'foo',
                    'value' => 'Foo',
                ],
                [
                    'key' => 'bar',
                    'value' => 'Bar',
                ]
            ],
        ];

        $this->assertEquals($returnArray, $this->normalizer->normalize($this->dictionary));
    }
}
