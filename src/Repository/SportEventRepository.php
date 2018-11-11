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
