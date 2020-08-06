<?php
declare(strict_types=1);

namespace App\Dictionary;

use App\Dictionary\Dictionary\SimpleDictionary;

class LeaveTypeDictionary extends SimpleDictionary
{
    public const ANNUAL_LEAVE = 'annual_leave';
    public const HOMEWORKING = 'homeworking';

    public function __construct()
    {
        parent::__construct('leaveType', [
            self::ANNUAL_LEAVE => 'Congé payé',
            self::HOMEWORKING => 'Télétravail',
        ]);
    }
}
