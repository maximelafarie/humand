<?php

namespace App\Tests\DataProvider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\DataProvider\DictionaryDataProvider;
use App\Dictionary\Dictionary\SimpleDictionary;
use Knp\DictionaryBundle\Dictionary;
use Knp\DictionaryBundle\Dictionary\Collection;
use PHPUnit\Framework\TestCase;

class DictionaryDataProviderTest extends TestCase
{
    private DictionaryDataProvider $dictionaryDataProvider;

    private SimpleDictionary$dictionary;

    private Collection $collection;

    public function setUp()
    {
        $this->dictionary = new SimpleDictionary('fooDictionary', ['foo', 'bar', 'baz']);
        $this->collection = new Collection($this->dictionary, new SimpleDictionary('barName', ['bar', 'baz']));

        $this->dictionaryDataProvider = new DictionaryDataProvider($this->collection);
    }

    public function testItIsInstanceOfCorrectsProviders()
    {
        $this->assertInstanceOf(CollectionDataProviderInterface::class, $this->dictionaryDataProvider);
        $this->assertInstanceOf(ItemDataProviderInterface::class, $this->dictionaryDataProvider);
        $this->assertInstanceOf(RestrictedDataProviderInterface::class, $this->dictionaryDataProvider);
    }

    public function testItGetCollectionOfDictionaries()
    {
        $providerCollection = $this->dictionaryDataProvider->getCollection(Dictionary::class);

        $this->assertIsArray($providerCollection);
        $this->assertCount(2, $providerCollection);
        $this->assertArrayHasKey('fooDictionary', $providerCollection);
        $this->assertSame($providerCollection['fooDictionary'], $this->dictionary);
    }

    public function testItGetDictionaryItem()
    {
        $returnedDictionary = $this->dictionaryDataProvider->getItem(Dictionary::class, 'fooDictionary');

        $this->assertSame($returnedDictionary, $this->dictionary);
    }

    public function testItSupportsDictionary()
    {
        $this->assertFalse($this->dictionaryDataProvider->supports(\stdClass::class));
        $this->assertTrue($this->dictionaryDataProvider->supports(SimpleDictionary::class));
    }
}
