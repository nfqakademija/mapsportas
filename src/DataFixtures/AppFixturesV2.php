<?php
declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\EventApplication;
use App\Entity\SportEvent;
use App\Entity\SportType;
use App\Entity\SportVenue;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;

class AppFixturesV2 extends Fixture implements OrderedFixtureInterface
{
    const SPORT_TYPES = [
        'Krepšinis', 'Bėgimas', 'Boulingas', 'Futbolas',
        'Biliardas', 'Smiginis', 'Regbis', 'Tinklinis', 'Rankinis',
        'Tenisas', 'Stalo Tenisas',
    ];

    private $faker;
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->faker = Factory::create();
        $this->entityManager = $entityManager;
    }

    public function load(ObjectManager $objectManager)
    {
        $this->createAdmin();
        $users = [];
        for ($i = 0; $i < 10; $i++) {
            for ($j = 1; $j < 11; $j++) {
                $user = $this->createUser();
                array_push($users, $user);
            }
        }

        foreach (self::SPORT_TYPES as $type) {
            $sportType = $this->createSportType($type);
            for ($i = 1; $i < 4; $i++) {
                $sportVenue = $this->createSportVenue($sportType);
                if ($i < 3) {
                    for ($j = 1; $j < rand(3, 7); $j++) {
                        $sportEvent = $this->createSportEvent($users[rand(1, 31)], $sportVenue);
                        $temp = rand(0, 5);
                        if ($temp == 1) {
                            $this->applyForEvent($users[rand(32, 66)], $sportEvent);
                        }
                        if ($temp == 2) {
                            $this->applyForEvent($users[rand(32, 44)], $sportEvent);
                            $this->applyForEvent($users[rand(45, 66)], $sportEvent);
                        }
                    }
                }
            }
        }
        $this->entityManager->flush();
    }

    public function createUser()
    {
        $user = new User();
        $user->setUsername($this->faker->userName);
        $user->setName($this->faker->name);
        $user->setSurname($this->faker->lastName);
        $user->setEmail($this->faker->email);
        $user->setPlainPassword('password');
        $user->setEnabled(1);
        $user->setBirthDate($this->faker->dateTimeBetween());
        $user->setAvatar('default.png');
        $user->setCreatedAt(new \DateTime('now'));
        $this->entityManager->persist($user);

        return $user;
    }

    public function createAdmin()
    {
        $user = new User();
        $user->setUsername('admin');
        $user->setName('admin');
        $user->setSurname('admin');
        $user->setEmail("admin@gmail.com");
        $user->setPlainPassword('admin');
        $user->setEnabled(1);
        $user->setBirthDate($this->faker->dateTimeBetween());
        $user->setRoles(['ROLE_ADMIN']);
        $user->setAvatar('default.png');
        $user->setCreatedAt(new \DateTime('now'));
        $this->entityManager->persist($user);
    }

    public function createSportType($name)
    {
        $sportType = new SportType();
        $sportType->setName($name);
        $this->entityManager->persist($sportType);

        return $sportType;
    }

    public function createSportVenue(SportType $sportType)
    {
        $sportVenue = new SportVenue();
        $sportVenue->setSportType($sportType);
        $sportVenue->setName($sportType->getName() . ' Aikštelė ' . rand(1, 10));
        $sportVenue->setAddress($this->faker->address);
        $sportVenue->setCity('Vilnius');
        $sportVenue->setDescription($this->faker->realText(50));
        $sportVenue->setVenuePhoto('default.png');
        $this->entityManager->persist($sportVenue);

        return $sportVenue;
    }

    public function createSportEvent(User $user, SportVenue $sportVenue)
    {
        $sportEvent = new SportEvent();
        $sportEvent->setMaxMembers($this->faker->numberBetween(2, 100));
        $sportEvent->setStatus(SportEvent::STATUS_UPCOMING);
        $sportEvent->setDate($this->faker->dateTimeBetween('+1 month', '+3 month'));
        $sportEvent->setSportType($sportVenue->getSportType());
        $sportEvent->setSportVenue($sportVenue);
        $sportEvent->setCreator($user);
        $this->entityManager->persist($sportEvent);
        $this->applyForEvent($user, $sportEvent);

        return $sportEvent;
    }

    public function applyForEvent(User $user, SportEvent $sportEvent)
    {
        $application = new EventApplication();
        $application->setUser($user);
        $application->setSportEvent($sportEvent);
        $application->setCreatedAt($this->faker->dateTimeBetween('-2 month'));
        $this->entityManager->persist($application);
    }

    /**
     * Get the order of this fixture
     * @return integer
     */
    public function getOrder()
    {
        return 1;
    }
}
