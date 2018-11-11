<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\SportTypeRepository")
 */
class SportType
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Regex(
     *     pattern="/^[A-Za-zĄąČčĘęĖėĮįŠšŲųŪūŽž ]+$/",
     *     message="Name contains only letters A-Z."
     * )
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SportVenue", mappedBy="sportTypeID")
     */
    private $sportVenues;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SportEvent", mappedBy="sportTypeId")
     */
    private $sportEvents;

    public function __construct()
    {
        $this->sportVenues = new ArrayCollection();
        $this->sportEvents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|SportVenue[]
     */
    public function getSportVenues(): Collection
    {
        return $this->sportVenues;
    }

    public function addSportVenue(SportVenue $sportVenue): self
    {
        if (!$this->sportVenues->contains($sportVenue)) {
            $this->sportVenues[] = $sportVenue;
            $sportVenue->setSportType($this);
        }

        return $this;
    }

    public function removeSportVenue(SportVenue $sportVenue): self
    {
        if ($this->sportVenues->contains($sportVenue)) {
            $this->sportVenues->removeElement($sportVenue);
            // set the owning side to null (unless already changed)
            if ($sportVenue->getSportType() === $this) {
                $sportVenue->setSportType(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|SportEvent[]
     */
    public function getSportEvents(): Collection
    {
        return $this->sportEvents;
    }

    public function addSportEvent(SportEvent $sportEvent): self
    {
        if (!$this->sportEvents->contains($sportEvent)) {
            $this->sportEvents[] = $sportEvent;
            $sportEvent->setSportType($this);
        }

        return $this;
    }

    public function removeSportEvent(SportEvent $sportEvent): self
    {
        if ($this->sportEvents->contains($sportEvent)) {
            $this->sportEvents->removeElement($sportEvent);
            // set the owning side to null (unless already changed)
            if ($sportEvent->getSportType() === $this) {
                $sportEvent->setSportType(null);
            }
        }

        return $this;
    }
}
