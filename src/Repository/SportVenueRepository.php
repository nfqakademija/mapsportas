<?php

namespace App\Repository;

use App\Entity\SportVenue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SportVenue|null find($id, $lockMode = null, $lockVersion = null)
 * @method SportVenue|null findOneBy(array $criteria, array $orderBy = null)
 * @method SportVenue[]    findAll()
 * @method SportVenue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SportVenueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SportVenue::class);
    }

    public function findVenuesLimitedNumber(): array
    {
        $qb = $this->createQueryBuilder('e')
            ->setMaxResults(6)
            ->getQuery();

        return $qb->execute();
    }

    // /**
    //  * @return SportVenue[] Returns an array of SportVenue objects
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
    public function findOneBySomeField($value): ?SportVenue
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
