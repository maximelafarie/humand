<?php

declare(strict_types=1);

namespace App\Tests\PublicHolidaysService;

use App\Exception\PublicHolidaysNotFoundException;
use App\PublicHolidaysService\AbstractPublicHolidays;
use App\PublicHolidaysService\PublicHolidaysRegistry;
use PHPUnit\Framework\TestCase;

class PublicHolidaysRegistryTest extends TestCase
{
    public function testItAddPublicHolidays()
    {
        $provider = new PublicHolidaysRegistry();
        $provider->add(new FooPublicHolidays());

        $this->assertCount(1, $provider);
    }

    public function testItThrowErrorWhenGetBadCountryPublicHolidays()
    {
        $this->expectException(PublicHolidaysNotFoundException::class);
        $this->expectExceptionMessage('The public holidays "bar" has not been found in the registry. Known countries are: "foo".');

        $provider = new PublicHolidaysRegistry();
        $provider->add(new FooPublicHolidays());
        $provider->getItemByCountry('bar');
    }
}

class FooPublicHolidays extends AbstractPublicHolidays
{
    public function getPublicHolidays(string $year, array $options = []): array
    {
        return [];
    }

    public function getCountry(): string
    {
        return 'foo';
    }
}
