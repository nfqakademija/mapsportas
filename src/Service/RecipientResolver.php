<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\EventApplication;
use Doctrine\Common\Collections\Collection;

class RecipientResolver
{
    public function resolve(Collection $applications, EventApplication $eventApplication): array
    {
        $recipients = [];
        foreach ($applications->getIterator() as $application) {
            if ($application->getUser() !== $eventApplication->getUser()) {
                $recipients[] = $application;
            }
        }

        return $recipients;
    }
}
