<?php

declare(strict_types=1);

namespace App\Controller;

use App\PublicHolidaysService\PublicHolidaysRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PublicHolidaysAction extends AbstractController
{
    private PublicHolidaysRegistry $publicHolidaysRegistry;
    private string $country;

    public function __construct(PublicHolidaysRegistry $publicHolidaysRegistry, string $country)
    {
        $this->publicHolidaysRegistry = $publicHolidaysRegistry;
        $this->country = $country;
    }

    public function __invoke(Request $request, $year)
    {
        $publicHolidays = $this->publicHolidaysRegistry->getItemByCountry($this->country);

        return new JsonResponse($publicHolidays->getPublicHolidays($year, $request->query->all()));
    }
}
