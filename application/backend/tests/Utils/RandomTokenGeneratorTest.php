<?php
declare(strict_types=1);

namespace App\Tests\Utils;

use App\Utils\RandomTokenGenerator;
use PHPUnit\Framework\TestCase;

class RandomTokenGeneratorTest extends TestCase
{
    public function testItGenerateARandomToken()
    {
        $generator = new RandomTokenGenerator();
        $token     = $generator->generateToken();
        $token2    = $generator->generateToken();

        $this->assertStringMatchesFormat('%s', $token);
        $this->assertEquals(mb_strlen($token), RandomTokenGenerator::TOKEN_LENGTH);

        $this->assertNotEquals($token, $token2);
    }
}
