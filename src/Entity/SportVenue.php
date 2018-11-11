<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\SportVenueRepository")
 */
class SportVenue
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Adresas turi būti nurodytas.")
     * @Assert\Regex(
     *     pattern="/^[A-Za-zĄąČčĘęĖėĮįŠšŲųŪūŽž\- ]+$/",
     *     message="Name contains only letters A-Z."
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(
     *     min=10,
     *     minMessage="Per trumpas aprašymas"
     * )
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Adresas turi būti nurodytas.")
     */
    private $adress;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Miestas turi būti nurodytas")
     * @Assert\Regex(
     *     pattern="/^[A-Za-zĄąČčĘęĖėĮįŠšŲųŪūŽž ]+$/",
     *     message="Name contains only letters A-Z."
     * )
     */
    private $city;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SportType", inversedBy="sportVenues")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Sporto Tipas turi būti nurodytas")
     */
    private $sportType;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SportEvent", mappedBy="sportVenueId")
     */
    private $sportEvents;

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

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): self
    {
        $this->adress = $adress;

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
}
