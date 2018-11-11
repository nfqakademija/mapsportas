<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181111112724 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sport_event (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, sport_type_id INT NOT NULL, sport_venue_id INT NOT NULL, max_members INT NOT NULL, date DATETIME NOT NULL, INDEX IDX_8FD26BBE61220EA6 (creator_id), INDEX IDX_8FD26BBE64F9C039 (sport_type_id), INDEX IDX_8FD26BBE7605C100 (sport_venue_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sport_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sport_venue (id INT AUTO_INCREMENT NOT NULL, sport_type_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, adress VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, INDEX IDX_25ED7A1464F9C039 (sport_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sport_event ADD CONSTRAINT FK_8FD26BBE61220EA6 FOREIGN KEY (creator_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE sport_event ADD CONSTRAINT FK_8FD26BBE64F9C039 FOREIGN KEY (sport_type_id) REFERENCES sport_type (id)');
        $this->addSql('ALTER TABLE sport_event ADD CONSTRAINT FK_8FD26BBE7605C100 FOREIGN KEY (sport_venue_id) REFERENCES sport_venue (id)');
        $this->addSql('ALTER TABLE sport_venue ADD CONSTRAINT FK_25ED7A1464F9C039 FOREIGN KEY (sport_type_id) REFERENCES sport_type (id)');
        $this->addSql('ALTER TABLE user ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME DEFAULT NULL, CHANGE birth_date birth_date DATE DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sport_event DROP FOREIGN KEY FK_8FD26BBE64F9C039');
        $this->addSql('ALTER TABLE sport_venue DROP FOREIGN KEY FK_25ED7A1464F9C039');
        $this->addSql('ALTER TABLE sport_event DROP FOREIGN KEY FK_8FD26BBE7605C100');
        $this->addSql('DROP TABLE sport_event');
        $this->addSql('DROP TABLE sport_type');
        $this->addSql('DROP TABLE sport_venue');
        $this->addSql('ALTER TABLE `user` DROP created_at, DROP updated_at, CHANGE birth_date birth_date DATETIME DEFAULT NULL');
    }
}
