<?php
declare(strict_types=1);

namespace App\Event;

use App\Entity\User;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\Event;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploadedEvent extends Event
{
    protected $file;
    protected $user;
    protected $directory;

    public function __construct(
        UploadedFile $uploadedFile,
        UserInterface $user,
        string $directory
    ) {
        $this->file = $uploadedFile;
        $this->user = $user;
        $this->directory = $directory;
    }

    public function getUploadedFile()
    {
        return $this->file;
    }

    public function setUploadedFile(UploadedFile $uploadedFile)
    {
        $this->file = $uploadedFile;

        return $this;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    public function getDirectory()
    {
        return $this->directory;
    }

    public function setDirectory(string $directory)
    {
        $this->directory = $directory;

        return $this;
    }
}
