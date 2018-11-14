<?php

namespace App\Repository;

use App\Entity\EventApplication;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method EventApplication|null find($id, $lockMode = null, $lockVersion = null)
 * @method EventApplication|null findOneBy(array $criteria, array $orderBy = null)
 * @method EventApplication[]    findAll()
 * @method EventApplication[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EventApplicationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, EventApplication::class);
    }

    // /**
    //  * @return EventApplication[] Returns an array of EventApplication objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EventApplication
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
