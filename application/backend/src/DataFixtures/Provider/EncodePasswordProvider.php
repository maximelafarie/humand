<?php

declare(strict_types=1);

namespace App\DataFixtures\Provider;

use App\Entity\User;
use Faker\Generator;
use Faker\Provider\Base as BaseProvider;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * EncodePasswordProvider.
 */
class EncodePasswordProvider extends BaseProvider
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(Generator $generator, UserPasswordEncoderInterface $passwordEncoder)
    {
        parent::__construct($generator);

        $this->passwordEncoder = $passwordEncoder;
    }

    public function encodePassword(string $password): string
    {
        return $this->passwordEncoder->encodePassword(new User(), $password);
    }
}
