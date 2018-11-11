<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\SportEventRepository")
 */
class SportEvent
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="sportEvents")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Įvykio kurėjas turi būti nurodytas.")
     */
    private $creator;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SportType", inversedBy="sportEvents")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Sporto rūšis turi būti nurodyta.")
     */
    private $sportType;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SportVenue", inversedBy="sportEvents")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Vieta turi būti nurodyta.")
     */
    private $sportVenue;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="Maksimalus dalyvių skaičius turi būti nurodytas.")
     */
    private $maxMembers;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

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
}
