<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\Type;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SportEventRepository")
 */
class SportEvent
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"sportEvent", "sportType", "sportVenue", "user"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="sportEvents", fetch="EAGER")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Creator of Event is required")
     *
     * @Groups("sportEvent")
     */
    private $creator;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SportType", inversedBy="sportEvents")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Sport type is required")
     *
     * @Groups({"sportEvent", "user"})
     */
    private $sportType;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SportVenue", inversedBy="sportEvents")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Sport Venue is required")
     *
     * @Groups({"sportEvent", "sportType", "user"})
     */
    private $sportVenue;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="Maximum number of people is required!")
     * @Assert\Range(min=1, max=100)
     *
     * @Groups({"sportEvent", "sportType", "sportVenue", "user"})
     */
    private $maxMembers;

    /**
     * @ORM\Column(type="datetime")
     * @Type("DateTime<'Y-m-d H:i'>")
     * @Assert\GreaterThan("today", message="Only future dates!")
     *
     * @Groups({"sportEvent", "sportType", "sportVenue", "user"})
     */
    private $date;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\EventApplication", mappedBy="sportEvent")
     *
     * @Groups({"sportEvent", "sportType", "sportVenue", "user"})
     */
    private $applyedUsers;

    public function __construct()
    {
        $this->applyedUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    public function getSportType(): ?SportType
    {
        return $this->sportType;
    }

    public function setSportType(?SportType $sportType): self
    {
        $this->sportType = $sportType;

        return $this;
    }

    public function getSportVenue(): ?SportVenue
    {
        return $this->sportVenue;
    }

    public function setSportVenue(?SportVenue $sportVenue): self
    {
        $this->sportVenue = $sportVenue;

        return $this;
    }

    public function getMaxMembers(): ?int
    {
        return $this->maxMembers;
    }

    public function setMaxMembers(int $maxMembers): self
    {
        $this->maxMembers = $maxMembers;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Collection|EventApplication[]
     */
    public function getApplyedUsers(): Collection
    {
        return $this->applyedUsers;
    }

    public function addApplyedUser(EventApplication $applyedUser): self
    {
        if (!$this->applyedUsers->contains($applyedUser)) {
            $this->applyedUsers[] = $applyedUser;
            $applyedUser->setSportEvent($this);
        }

        return $this;
    }

    public function removeApplyedUser(EventApplication $applyedUser): self
    {
        if ($this->applyedUsers->contains($applyedUser)) {
            $this->applyedUsers->removeElement($applyedUser);
            // set the owning side to null (unless already changed)
            if ($applyedUser->getSportEvent() === $this) {
                $applyedUser->setSportEvent(null);
            }
        }

        return $this;
    }
}
