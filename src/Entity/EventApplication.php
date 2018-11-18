<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\Type;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventApplicationRepository")
 */
class EventApplication
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"sportEvent","sportType","sportVenue","user"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="userApplications")
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"sportEvent","sportType","sportVenue","user"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SportEvent", inversedBy="applyedUsers")
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"user"})
     */
    private $sportEvent;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"user"})
     * @Type("DateTime<'Y-m-d H:i'>")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getSportEvent(): ?SportEvent
    {
        return $this->sportEvent;
    }

    public function setSportEvent(?SportEvent $sportEvent): self
    {
        $this->sportEvent = $sportEvent;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
