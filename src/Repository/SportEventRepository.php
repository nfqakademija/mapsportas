<?php

namespace App\Repository;

use App\Entity\SportEvent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SportEvent|null find($id, $lockMode = null, $lockVersion = null)
 * @method SportEvent|null findOneBy(array $criteria, array $orderBy = null)
 * @method SportEvent[]    findAll()
 * @method SportEvent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SportEventRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SportEvent::class);
    }

    public function findFilteredEvents(int $perPage, int $first, $sportId, $from, $to, $min, $max): array
    {
        if ($from) {
            $from = new \DateTime($from);
        } else {
            $from = new \DateTime('now');
        }
        if ($to !== null) {
            $to = new \DateTime($to);
        }
        $qb = $this->createQueryBuilder('e')
            ->andWhere('e.date > :from')
            ->setParameter('from', $from);

        if ($to !== null) {
            $qb->andWhere('e.date < :to')
                ->setParameter('to', $to);
        }

        if ($sportId !== null) {
            $qb->andWhere('e.sportType = :sportId')
                ->setParameter('sportId', $sportId);
        }

        if ($min !== null) {
            $qb->andWhere('e.maxMembers > :min')
                ->setParameter('min', $min);
        }

        if ($max !== null) {
            $qb->andWhere('e.maxMembers < :max')
                ->setParameter('max', $max);
        }
        $qb->orderBy('e.date', 'ASC')
            ->setFirstResult($first)
            ->setMaxResults($perPage);
        return $qb->getQuery()->execute();
    }

    public function findUpcomingEvents(int $perPage, int $first): array
    {
        $date = new \DateTime('now');
        $qb = $this->createQueryBuilder('e')
            ->andWhere('e.date > :date')
            ->setParameter('date', $date)
            ->orderBy('e.date', 'ASC')
            ->setFirstResult($first)
            ->setMaxResults($perPage)
            ->getQuery();

        return $qb->execute();
    }


    // /**
    //  * @return SportEvent[] Returns an array of SportEvent objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SportEvent
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
