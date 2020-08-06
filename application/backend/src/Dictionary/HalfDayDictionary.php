<?php
declare(strict_types=1);

namespace App\Dictionary;

use App\Dictionary\Dictionary\SimpleDictionary;

class HalfDayDictionary extends SimpleDictionary
{
    public const MORNING = 'morning';
    public const AFTERNOON = 'afternoon';

    public function __construct()
    {
        parent::__construct('halfDay', [
            self::MORNING => 'Matin',
            self::AFTERNOON => 'Après-midi',
        ]);
    }
}
