<?php

declare(strict_types=1);

namespace App\Entity;

use Gedmo\Timestampable\Traits\Timestampable;
use Knp\DictionaryBundle\Validator\Constraints\Dictionary;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

class Leave
{
    use Timestampable;

    private UuidInterface $id;

    /**
     * @Dictionary(name="leaveType")
     */
    private string $leaveType;

    private \DateTime $date;
    private bool $accepted;
    private User $concernedUser;
    private User $author;

    public function __construct(string $leaveType, \DateTime $date, bool $accepted, User $concernedUser, User $author)
    {
        $this->id = Uuid::uuid4();
        $this->leaveType = $leaveType;
        $this->date = $date;
        $this->accepted = $accepted;
        $this->concernedUser = $concernedUser;
        $this->author = $author;
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    public function getLeaveType(): string
    {
        return $this->leaveType;
    }

    public function getDate(): \DateTime
    {
        return $this->date;
    }

    public function isAccepted(): bool
    {
        return $this->accepted;
    }

    public function getConcernedUser(): User
    {
        return $this->concernedUser;
    }

    public function getAuthor(): User
    {
        return $this->author;
    }
}
