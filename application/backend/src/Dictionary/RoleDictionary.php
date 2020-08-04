<?php

namespace App\Dictionary;

use App\Dictionary\Dictionary\SimpleDictionary;

class RoleDictionary extends SimpleDictionary
{
    public const ROLE_USER = 'role_user';
    public const ROLE_VALIDATOR = 'role_validator';

    public function __construct()
    {
        parent::__construct('userRole', [
            self::ROLE_USER => 'Utilisateur',
            self::ROLE_VALIDATOR => 'Validateur',
        ]);
    }
}