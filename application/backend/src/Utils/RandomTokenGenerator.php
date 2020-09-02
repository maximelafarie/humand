<?php

declare(strict_types=1);

namespace App\Utils;

use RandomLib\Factory;
use RandomLib\Generator;

class RandomTokenGenerator
{
    const TOKEN_LENGTH = 50;

    /**
     * @return string
     */
    public function generateToken()
    {
        $factory = new Factory();
        $generator = $factory->getMediumStrengthGenerator();

        return $generator->generateString(
            self::TOKEN_LENGTH,
            Generator::CHAR_DIGITS + Generator::CHAR_LOWER + Generator::CHAR_UPPER
        );
    }
}
