<?php
declare(strict_types=1);

namespace App\Dictionary\Dictionary;


use ArrayIterator;
use Exception;
use Knp\DictionaryBundle\Dictionary;
use Traversable;

class SimpleDictionary implements Dictionary
{
    private string $name;
    private array $values;

    public function __construct(string $name, array $values)
    {
        $this->name = $name;
        $this->values = $values;
    }

    public function getIterator()
    {
        return new ArrayIterator($this->values);
    }

    public function offsetExists($offset)
    {
        return \array_key_exists($offset, $this->values);
    }

    public function offsetGet($offset)
    {
        return $this->values[$offset];
    }

    public function offsetSet($offset, $value)
    {
        $this->values[$offset] = $value;
    }

    public function offsetUnset($offset)
    {
        unset($this->values[$offset]);
    }

    public function count()
    {
        return \count($this->values);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getValues(): array
    {
        return $this->values;
    }

    public function getKeys(): array
    {
        return \array_keys($this->values);
    }
}
