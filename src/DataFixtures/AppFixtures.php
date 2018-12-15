<?php

namespace App\DataFixtures;

use App\Entity\EventApplication;
use App\Entity\SportEvent;
use App\Entity\SportType;
use App\Entity\SportVenue;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture implements OrderedFixtureInterface
{
    private const USERNAMES = [
        'user','extraUser','vartotojas','papildomasVartotojas',
        'sportininkas','begikas','tiesiogVartotojas',
        'nežinau','žinau','turbo',
    ];

    private const NAMES = [
        'Petras','Jonas','Darius','Marius','Tomas',
        'Romas','Kestas','Albinas','Vytautas','Rimas',
    ];

    private const SURNAMES = [
        'Jonaitis','Petraitis','Jurgaitis','Danilevičius',
        'Jurkus','Petkevičius','Petkus','Astrauskas',
        'Sabonis','Junka',
    ];

    private const SPORT_TYPES = [
        'Krepšinis','Bėgimas','Boulingas','Futbolas',
        'Biliardas','Smiginis','Regbis','Tinklinis','Rankinis',
        'Tenisas','Stalo Tenisas',
    ];

    private const ADRESSES = [
      'Taikos g. 111B, Vilnius 05202','Čiobiškio g. 1, Vilnius 07179',
        'Priegliaus g. 8, Vilnius 06269', 'Šeškinės sen, Vilnius 07172',
        'Širvintų g. 82, Vilnius 08216', 'A. P. Kavoliuko g. 28, Vilnius 04329',
        'Viršuliškių g. 40, Vilnius 05112', 'Ukmergės g. 369, Vilnius 06327',
    ];

    public function load(ObjectManager $manager)
    {
        $this->createAdmin($manager);
        $users = [];
        for ($i = 0; $i < 10; $i++) {
            for ($j = 1; $j < 11; $j++) {
                $user = $this->createUser(self::USERNAMES[$i].$j, self::NAMES[$i], self::SURNAMES[$i], $manager);
                array_push($users, $user);
            }
        }

        foreach (self::SPORT_TYPES as $type) {
            $sportType = $this->createSportType($type, $manager);
            for ($i = 1; $i < 4; $i++) {
                $sportVenue = $this->createSportVenue($sportType, $manager);
                if ($i < 3) {
                    for ($j = 1; $j < rand(3, 7); $j++) {
                        $sportEvent = $this->createSportEvent($users[rand(1, 31)], $sportVenue, $manager);
                        $temp = rand(0, 5);
                        if ($temp == 1) {
                            $this->applyForEvent($users[rand(32, 66)], $sportEvent, $manager);
                        }
                        if ($temp == 2) {
                            $this->applyForEvent($users[rand(32, 44)], $sportEvent, $manager);
                            $this->applyForEvent($users[rand(45, 66)], $sportEvent, $manager);
                        }
                    }
                }
            }
        }
        $manager->flush();
    }

    public function createUser($username, $name, $surname, ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername($username);
        $user->setName($name);
        $user->setSurname($surname);
        $user->setEmail($username."@gmail.com");
        $user->setPlainPassword('password');
        $user->setEnabled(1);
        $user->setBirthDate(new \DateTime('1990-01-01'));
        $user->setAvatar('default.png');
        $user->setCreatedAt(new \DateTime('now'));
        $manager->persist($user);
        return $user;
    }

    public function createAdmin(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('admin');
        $user->setName('admin');
        $user->setSurname('admin');
        $user->setEmail("admin@gmail.com");
        $user->setPlainPassword('admin');
        $user->setEnabled(1);
        $user->setBirthDate(new \DateTime('1990-01-01'));
        $user->setRoles(['ROLE_ADMIN']);
        $user->setAvatar('default.png');
        $user->setCreatedAt(new \DateTime('now'));
        $manager->persist($user);
    }

    public function createSportType($name, ObjectManager $manager)
    {
        $sportType = new SportType();
        $sportType->setName($name);
        $manager->persist($sportType);
        return $sportType;
    }

    public function createSportVenue(SportType $sportType, ObjectManager $manager)
    {
        $sportVenue = new SportVenue();
        $sportVenue->setSportType($sportType);
        $sportVenue->setName($sportType->getName().' Aikštelė '.rand(1, 10));
        $sportVenue->setAddress(self::ADRESSES[rand(0, 7)]);
        $sportVenue->setCity('Vilnius');
        $sportVenue->setDescription('Lauko aikštelė');
        $sportVenue->setVenuePhoto('default.png');
        $manager->persist($sportVenue);
        return $sportVenue;
    }

    public function createSportEvent(User $user, SportVenue $sportVenue, ObjectManager $manager)
    {
        $sportEvent = new SportEvent();
        $sportEvent->setMaxMembers(rand(2, 10));
        $date = new \DateTime('2019-'.rand(1, 5).'-'.rand(1, 28).' '.rand(8, 20).":00");
        $sportEvent->setStatus(SportEvent::STATUS_UPCOMING);
        $sportEvent->setDate($date);
        $sportEvent->setSportType($sportVenue->getSportType());
        $sportEvent->setSportVenue($sportVenue);
        $sportEvent->setCreator($user);
        $manager->persist($sportEvent);
        $this->applyForEvent($user, $sportEvent, $manager);
        return $sportEvent;
    }

    public function applyForEvent(User $user, SportEvent $sportEvent, ObjectManager $manager)
    {
        $application = new EventApplication();
        $application->setUser($user);
        $application->setSportEvent($sportEvent);
        $date = new \DateTime('2018-'.rand(11, 12).'-'.rand(1, 28).' '.rand(8, 20).":00");
        $application->setCreatedAt($date);
        $manager->persist($application);
    }

    /**
     * Get the order of this fixture
     * @return integer
     */
    public function getOrder()
    {
        return 2;
    }
}
