<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Notification;
use FOS\UserBundle\Model\UserInterface;

class NotificationMapper
{
    public function mapToEntity(UserInterface $recipient, array $data): Notification
    {
        $application = $data['application'];

        return (new Notification())
            ->setTitle(Notification::TITLE)
            ->setRecipient($recipient)
            ->setEventSubject($application->getSportEvent()->getId())
            ->setAction($data['action'])
            ->setActionParty($application->getUser()->getId())
        ;
    }
}
