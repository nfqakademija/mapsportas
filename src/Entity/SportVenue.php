<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SportVenueRepository")
 */
class SportVenue
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"sportVenue","sportEvent","sportType"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Name is required")
     *
     * @Groups({"sportVenue", "sportEvent", "sportType", "user"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(
     *     min=10,
     *     max=200,
     *     minMessage="Description is too short.",
     *     maxMessage="Description is too long."
     * )
     *
     * @Groups({"sportVenue","sportEvent","sportType"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Address is required.")
     *
     * @Groups({"sportVenue","sportEvent","sportType"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="City is required")
     *
     * @Groups({"sportVenue","sportEvent","sportType"})
     */
    private $city;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SportType", inversedBy="sportVenues")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Sport type is required")
     *
     * @Groups({"sportVenue"})
     */
    private $sportType;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SportEvent", mappedBy="sportVenue")
     *
     * @Groups({"sportVenue"})
     */
    private $sportEvents;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\File(mimeTypes={ "image/png", "image/jpeg" })
     *
     * @Groups({"sportVenue","sportEvent"})
     */
    private $venuePhoto;

    public function __construct()
    {
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

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
            $sportEvent->setSportVenue($this);
        }

        return $this;
    }

    public function removeSportEvent(SportEvent $sportEvent): self
    {
        if ($this->sportEvents->contains($sportEvent)) {
            $this->sportEvents->removeElement($sportEvent);
            // set the owning side to null (unless already changed)
            if ($sportEvent->getSportVenue() === $this) {
                $sportEvent->setSportVenue(null);
            }
        }

        return $this;
    }

    public function getVenuePhoto(): ?string
    {
        return $this->venuePhoto;
    }

    public function setVenuePhoto(?string $venuePhoto): self
    {
        $this->venuePhoto = $venuePhoto;

        return $this;
    }
}
