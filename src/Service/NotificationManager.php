<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\EventApplication;
use App\Entity\Notification;
use App\Entity\SportEvent;
use App\Normalizer\NotificationNormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Swift_Mailer;
use Swift_Message;
use Twig_Environment;

class NotificationManager
{
    private $swiftMailer;
    private $entityManager;
    private $notificationNormalizer;
    private $renderer;
    private $logger;

    public function __construct(
        Swift_Mailer $swiftMailer,
        EntityManagerInterface $entityManager,
        NotificationNormalizer $notificationNormalizer,
        Twig_Environment $environment,
        LoggerInterface $logger
    ) {
        $this->swiftMailer = $swiftMailer;
        $this->entityManager = $entityManager;
        $this->notificationNormalizer = $notificationNormalizer;
        $this->renderer = $environment;
        $this->logger = $logger;
    }

    public function notify(SportEvent $sportEvent, array $context)
    {
        if (!$context['application'] instanceof EventApplication || !array_key_exists('action', $context)) {
            throw new \Exception('context does not have application or action');
        }
        $notifications = $this->notificationNormalizer->mapToEntity(
            [
                'userApplications' => $sportEvent->getApplyedUsers(),
                'context' => $context
            ]
        );
        $application = $context['application'];

        try {
            foreach ($notifications as $notification) {
                $this->swiftMailer->send($this->buildEmail($notification, $application));
                $this->entityManager->persist($notification);
            }
        } catch (\Exception $exception) {
            $this->logger->error(sprintf('error: %s', $exception->getMessage()));
        }
        $this->entityManager->flush();
    }

    private function buildEmail(
        Notification $notification,
        EventApplication $application
    ): Swift_Message {
        return (new Swift_Message())
            ->setFrom(getenv('MAILER_USERNAME'))
            ->setTo($notification->getRecipient()->getEmail())
            ->setSubject($notification->getTitle())
            ->setBody(
                $this->renderer->render(
                    $this->resolveTemplate(
                        $notification->getAction()
                    ),
                    [
                        'recipient' => $notification->getRecipient(),
                        'user' => $application->getUser(),
                        'sport_event' => $application->getSportEvent()
                    ]
                ),
                'text/html'
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
