<?php
declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NotificationRepository")
 */
class Notification
{
    const TITLE = 'Pasikeitimai jūsų event\'e';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="emailList")
     */
    private $recipient;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    private $actionParty;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    private $eventSubject;

    /**
     * @var string
     * @ORM\Column(type="string", length=128)
     */
    private $action;

    public function getId()
    {
        return $this->id;
    }

    public function getRecipient()
    {
        return $this->recipient;
    }

    public function setRecipient(UserInterface $recipient)
    {
        $this->recipient = $recipient;

        return $this;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     *
     * @return $this
     */
    public function setTitle(string $title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return string
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * @param string $action
     *
     * @return $this
     */
    public function setAction(string $action)
    {
        $this->action = $action;

        return $this;
    }

    /**
     * @return int
     */
    public function getActionParty()
    {
        return $this->actionParty;
    }

    /**
     * @param int $actionParty
     *
     * @return $this
     */
    public function setActionParty(int $actionParty)
    {
        $this->actionParty = $actionParty;

        return $this;
    }

    /**
     * @return int
     */
    public function getEventSubject()
    {
        return $this->eventSubject;
    }

    /**
     * @param int $eventSubject
     *
     * @return $this
     */
    public function setEventSubject(int $eventSubject)
    {
        $this->eventSubject = $eventSubject;

        return $this;
    }
}
