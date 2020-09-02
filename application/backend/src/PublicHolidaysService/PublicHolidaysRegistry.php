<?php

declare(strict_types=1);

namespace App\PublicHolidaysService;

use App\Exception\PublicHolidaysNotFoundException;

class PublicHolidaysRegistry implements \ArrayAccess, \IteratorAggregate, \Countable
{
    /**
     * @var AbstractPublicHolidays[]
     */
    private array $publicHolidays;

    /**
     * @param string $country
     *
     * @return PublicHolidaysRegistry
     */
    public function add(AbstractPublicHolidays $publicHolidays)
    {
        $this->set($publicHolidays->getCountry(), $publicHolidays);

        return $this;
    }

    /**
     * @return PublicHolidaysRegistry
     */
    public function set(string $country, AbstractPublicHolidays $publicHolidays)
    {
        if (isset($this->publicHolidays[$country])) {
            throw new \RuntimeException(\sprintf('The key "%s" already exists in the public holidays registry', $country));
        }

        $this->publicHolidays[$country] = $publicHolidays;

        return $this;
    }

    /**
     * @param mixed $offset
     *
     * @return AbstractPublicHolidays
     */
    public function getItemByCountry(string $country)
    {
        return $this->offsetGet(['country' => $country]);
    }

    public function getIterator()
    {
        return new \ArrayIterator($this->publicHolidays);
    }

    public function offsetExists($offset)
    {
        return isset($this->publicHolidays[$offset['country']]);
    }

    public function offsetGet($offset)
    {
        if (false === $this->offsetExists($offset)) {
            throw new PublicHolidaysNotFoundException(\sprintf('The public holidays "%s" has not been found in the registry. Known countries are: "%s".', $offset['country'], \implode('", "', \array_keys($this->publicHolidays))));
        }

        return $this->publicHolidays[$offset['country']];
    }

    public function offsetSet($offset, $value)
    {
        throw new \RuntimeException("Use App\PublicHolidaysService\PublicHolidaysRegistry::set instead.");
    }

    public function offsetUnset($offset)
    {
        throw new \RuntimeException("You can't destroy public holidays.");
    }

    public function count()
    {
        return \count($this->publicHolidays);
    }
}
