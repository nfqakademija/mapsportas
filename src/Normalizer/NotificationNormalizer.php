<?php
declare(strict_types=1);

namespace App\Normalizer;

use App\Entity\Notification;

class NotificationNormalizer implements NormalizerInterface
{
    public function mapToEntity(array $data): Notification
    {
        $application = $data['context']['application'];

        return (new Notification())
            ->setTitle(Notification::TITLE)
            ->setRecipient($data['creator'])
            ->setEventSubject($application->getSportEvent()->getId())
            ->setAction($data['context']['action'])
            ->setActionParty($application->getUser()->getId());
    }

    public function mapToArray($data)
    {
    }
}
