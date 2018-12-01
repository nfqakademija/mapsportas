<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\EventApplication;
use App\Entity\Notification;
use App\Entity\SportEvent;
use Doctrine\ORM\EntityManagerInterface;
use Swift_Mailer;
use Swift_Message;
use Twig_Environment;

class NotificationManager
{
    private $swiftMailer;
    private $entityManager;
    private $notificationMapper;
    private $renderer;

    public function __construct(
        Swift_Mailer $swiftMailer,
        EntityManagerInterface $entityManager,
        NotificationMapper $notificationMapper,
        Twig_Environment $environment
    )
    {
        $this->swiftMailer = $swiftMailer;
        $this->entityManager = $entityManager;
        $this->notificationMapper = $notificationMapper;
        $this->renderer = $environment;
    }

    public function notify(SportEvent $sportEvent, array $context)
    {
        $notification = $this->notificationMapper->mapToEntity(
            $sportEvent->getCreator(),
            $context
        );
        $application = $context['application'];

        try {
            $this->swiftMailer->send($this->buildEmail($notification, $application));
        } catch (\Exception $exception) {
            throw new \Exception(sprintf('error: %s', $exception->getMessage()));
        }

        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    private function buildEmail(
        Notification $notification,
        EventApplication $application
    ): Swift_Message
    {
        return (new Swift_Message())
            ->setTo($notification->getRecipient()->getEmail())
            ->setSubject($notification->getTitle())
            ->setBody($this->renderer->render($this->resolveTemplate($notification->getAction()),
                [
                    'recipient' => $notification->getRecipient(),
                    'user' => $application->getUser(),
                    'sport_event' => $application->getSportEvent()
                ])
            );
    }

    private function resolveTemplate(string $action): string
    {
        if ($action === EventApplication::EVENT_JOIN) {
            return 'email/applied_event.html.twig';
        }

        return 'email/left_event.html.twig';
    }
}
