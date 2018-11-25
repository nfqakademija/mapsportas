<?php
declare(strict_types=1);

namespace App\Subscriber;

use App\Event\FileUploadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class FileUploadSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            'user.file.uploaded' => [
                'onFileUpload'
            ],
        ];
    }

    public function onFileUpload(FileUploadedEvent $event)
    {
        $file = $event->getUploadedFile();
        $fileName = md5(uniqid()) . '.' . $file->guessExtension();
        $file->move(
            $event->getDirectory(),
            $fileName
        );

        $event->getUser()->setAvatar($fileName);
    }
}

