<?php

declare(strict_types=1);

namespace App\PublicHolidaysService;

abstract class AbstractPublicHolidays
{
    abstract public function getPublicHolidays(string $year, array $options = []): array;

    abstract public function getCountry(): string;

    protected function isTrue($val, $return_null = false)
    {
        $boolval = (\is_string($val) ? \filter_var($val, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : (bool) $val);

        return null === $boolval && !$return_null ? false : $boolval;
    }
}
