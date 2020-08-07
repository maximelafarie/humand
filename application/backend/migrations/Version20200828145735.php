<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200828145735 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE leaves (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', author_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', concerned_user_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', leave_type VARCHAR(255) NOT NULL, date DATETIME NOT NULL, accepted TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_9D46AD5FF675F31B (author_id), INDEX IDX_9D46AD5F5880D9EB (concerned_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE leaves ADD CONSTRAINT FK_9D46AD5FF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE leaves ADD CONSTRAINT FK_9D46AD5F5880D9EB FOREIGN KEY (concerned_user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE leaves');
    }
}
