<?php
declare(strict_types=1);

namespace App\Normalizer;

use App\Entity\Notification;

class NotificationNormalizer implements NormalizerInterface
{
    public function mapToEntity(array $data)
    {
        $application = $data['context']['application'];
        $action = $data['context']['action'];
        $sportEvent = $application->getSportEvent()->getId();
        $actionParty = $application->getUser()->getId();
        $userApplications = $data['userApplications'];

        $notifications = [];
        foreach ($userApplications->getIterator() as $userApplication) {
            $notifications[] = (new Notification())
            ->setTitle(Notification::TITLE)
            ->setRecipient($userApplication->getUser())
            ->setEventSubject($sportEvent)
            ->setAction($action)
            ->setActionParty($actionParty);
        }

        return $notifications;
    }

    public function mapToArray($data)
    {
    }
}
