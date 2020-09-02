<?php
declare(strict_types=1);

namespace App\Dictionary;

use App\Dictionary\Dictionary\SimpleDictionary;

class PublicHolidayAvailableCountryDictionary extends SimpleDictionary
{
    public const FRANCE = 'france';

    public function __construct()
    {
        parent::__construct('userRole', [
            self::FRANCE => 'France',
        ]);
    }
}
