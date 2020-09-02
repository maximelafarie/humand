<?php

declare(strict_types=1);

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PublicHolidaysNotFoundException extends HttpException
{
    public function __construct($message, $statusCode = Response::HTTP_BAD_REQUEST)
    {
        parent::__construct($statusCode, $message);
    }
}
