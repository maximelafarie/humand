<?php
declare(strict_types=1);

namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Dictionary\Dictionary\SimpleDictionary;
use Knp\DictionaryBundle\Dictionary\Collection;

class DictionaryDataProvider implements CollectionDataProviderInterface, ItemDataProviderInterface, RestrictedDataProviderInterface
{
    private Collection $collection;

    public function __construct($collection)
    {
        $this->collection = $collection;
    }

    public function getCollection(string $resourceClass, string $operationName = null)
    {
        return \iterator_to_array($this->collection);
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        return $this->collection->offsetGet($id);
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return SimpleDictionary::class === $resourceClass;
    }
}
