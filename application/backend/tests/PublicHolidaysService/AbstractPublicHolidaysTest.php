<?php

declare(strict_types=1);

namespace App\Tests\PublicHolidaysService;

use App\PublicHolidaysService\AbstractPublicHolidays;
use PHPUnit\Framework\TestCase;

class AbstractPublicHolidaysTest extends TestCase
{
    public function testItIsAnInstanceOf()
    {
        $this->assertInstanceOf(AbstractPublicHolidays::class, new BarPublicHolidays());
    }

    public function testItReturnCountry()
    {
        $this->assertEquals('foo', (new FooPublicHolidays())->getCountry());
    }

    public function testItReturnPublicHolidays()
    {
        $this->assertTrue(\is_array((new FooPublicHolidays())->getPublicHolidays('foo')));
    }
}

class BarPublicHolidays extends AbstractPublicHolidays
{
    public function getPublicHolidays(string $year, array $options = []): array
    {
        return [
            'foo',
        ];
    }

    public function getCountry(): string
    {
        return 'foo';
    }
}
