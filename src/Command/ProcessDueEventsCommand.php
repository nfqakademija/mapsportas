<?php
declare(strict_types=1);

namespace App\Command;

use App\Entity\SportEvent;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ProcessDueEventsCommand extends Command
{
    protected static $defaultName = 'process:due:events';
    private $entityManager;
    private $logger;

    public function __construct(
        EntityManagerInterface $entityManager,
        LoggerInterface $logger,
        ?string $name = null
    ) {
        parent::__construct($name);
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    protected function configure()
    {
        $this
            ->setDescription('Add a short description for your command')
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $repository = $this->entityManager->getRepository('App:SportEvent');
        /** @var SportEvent $event */
        foreach ($repository->findDueEvents() as $event) {
            if ($event->getStatus() !== SportEvent::STATUS_CANCELLED){
                $event->setStatus(SportEvent::STATUS_FINISHED);
                $this->entityManager->persist($event);
                $this->logger->info(sprintf('sport event id %d is finished.', $event->getId()));
            }
        }

        $this->entityManager->flush();
    }
}
