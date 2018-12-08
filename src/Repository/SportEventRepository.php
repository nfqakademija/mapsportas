<?php

namespace App\Repository;

use App\Entity\Filter;
use App\Entity\SportEvent;
use DateTimeImmutable;
use DateTimeInterface;
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

    public function findFilteredEvents(Filter $filter): array
    {
        if (!$filter->getFromDate() instanceof DateTimeInterface) {
            $filter->setFromDate(new DateTimeImmutable('now'));
        }

        $qb = $this->createQueryBuilder('e')
            ->andWhere('e.date > :from')
            ->setParameter('from', $filter->getFromDate()->format('Y-m-d H:i:s'));

        if ($filter->getToDate() instanceof DateTimeInterface) {
            $qb->andWhere('e.date < :to')
                ->setParameter('to', $filter->getToDate()->format('Y-m-d H:i:s'));
        }

        if ($filter->hasInContext('sportId')) {
            $qb->andWhere('e.sportType = :sportId')
                ->setParameter('sportId', $filter->getContext('sportId'));
        }

        if ($filter->hasInContext('min')) {
            $qb->andWhere('e.maxMembers > :min')
                ->setParameter('min', $filter->getContext('min'));
        }

        if ($filter->hasInContext('max')) {
            $qb->andWhere('e.maxMembers < :max')
                ->setParameter('max', $filter->getContext('max'));
        }
        $qb->orderBy('e.date', 'ASC')
            ->setFirstResult($filter->getFirst())
            ->setMaxResults($filter->getItemsPerPage());
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

    public function findEventsCount(Filter $filter)
    {
        $qb = $this->createQueryBuilder('e')
            ->select('count(e.id)')
            ->andWhere('e.date > :from')
            ->setParameter('from', $filter->getFromDate()->format('Y-m-d H:i:s'));

        if ($filter->getToDate() instanceof DateTimeInterface) {
            $qb->andWhere('e.date < :to')
                ->setParameter('to', $filter->getToDate()->format('Y-m-d H:i:s'));
        }

        if ($filter->hasInContext('sportId')) {
            $qb->andWhere('e.sportType = :sportId')
                ->setParameter('sportId', $filter->getContext('sportId'));
        }

        if ($filter->hasInContext('max')) {
            $qb->andWhere('e.maxMembers > :min')
                ->setParameter('min', $filter->getContext('min'));
        }

        if ($filter->hasInContext('max')) {
            $qb->andWhere('e.maxMembers < :max')
                ->setParameter('max', $filter->getContext('max'));
        }

        return $qb->getQuery()->execute();
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
