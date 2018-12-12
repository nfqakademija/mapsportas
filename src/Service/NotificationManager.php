<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\EventApplication;
use App\Entity\Notification;
use App\Entity\SportEvent;
use App\Normalizer\NotificationNormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Swift_Mailer;
use Swift_Message;
use Twig_Environment;

class NotificationManager
{
    private $swiftMailer;
    private $entityManager;
    private $notificationNormalizer;
    private $renderer;

    public function __construct(
        Swift_Mailer $swiftMailer,
        EntityManagerInterface $entityManager,
        NotificationNormalizer $notificationNormalizer,
        Twig_Environment $environment
    ) {
        $this->swiftMailer = $swiftMailer;
        $this->entityManager = $entityManager;
        $this->notificationNormalizer = $notificationNormalizer;
        $this->renderer = $environment;
    }

    public function notify(SportEvent $sportEvent, array $context)
    {
        if (!$context['application'] instanceof EventApplication || !array_key_exists('action', $context)) {
            throw new \Exception('context does not have application or action');
        }
        $notification = $this->notificationNormalizer->mapToEntity(
            [
                'creator' => $sportEvent->getCreator(),
                'context' => $context
            ]
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
                ), 'text/html'
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
