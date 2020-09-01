<?php

declare(strict_types=1);

namespace App\PublicHolidaysService\PublicHolidays;

use App\Dictionary\PublicHolidayAvailableCountryDictionary;
use App\PublicHolidaysService\AbstractPublicHolidays;

class FrenchPublicHolidays extends AbstractPublicHolidays
{
    private $dimanchePaques;

    public function getCountry(): string
    {
        return PublicHolidayAvailableCountryDictionary::FRANCE;
    }

    public function getPublicHolidays(string $year, array $options = []): array
    {
        $this->dimanchePaques = date("Y-m-d", easter_date($year));
        $joursFeries = [
            $this->dimanchePaques,
            $this->lundiPaques(),
            $this->jeudiAscension(),
            $this->lundiPentecote(),
            "$year-01-01",        // Nouvel an
            "$year-05-01",        // Fête du travail
            "$year-05-08",        // Armistice 1945
            "$year-05-15",        // Assomption
            "$year-07-14",        // Fête nationale
            "$year-11-11",        // Armistice 1918
            "$year-11-01",        // Toussaint
            "$year-12-25"         // Noël
        ];

        if (isset($options['alsaceMoselle']) && $this->isTrue($options['alsaceMoselle'])) {
            $joursFeries[] = "$year-12-26";
            $joursFeries[] = $this->vendrediSaint();
        }

        sort($joursFeries);

        return $joursFeries;
    }

    private function vendrediSaint()
    {
        return date("Y-m-d", strtotime("$this->dimanchePaques -2 day"));
    }

    private function lundiPaques()
    {
        return date("Y-m-d", strtotime("$this->dimanchePaques +1 day"));
    }

    private function jeudiAscension()
    {
        return date("Y-m-d", strtotime("$this->dimanchePaques +39 day"));
    }

    private function lundiPentecote()
    {
        return date("Y-m-d", strtotime("$this->dimanchePaques +50 day"));
    }
}
