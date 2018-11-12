<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="`user`")
 * @UniqueEntity(fields={"email","username"}, message="This Email or Username is already taken")
 */
class User extends BaseUser implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @Assert\NotBlank(message="Email is required")
     * @Assert\Email(message="This email is invalid")
     */
    protected $email;

    /**
     * @Assert\NotBlank(message="Username is required")
     * @Assert\Length(
     *     min=2,
     *     max=20,
     *     minMessage="Username must be between 2 and 20 characters long.",
     *     maxMessage="Username must be between 2 and 20 characters long."
     * )
     */
    protected $username;

    /**
     * @Assert\NotBlank(message="Password is required")
     * @Assert\Length(
     *     min=6,
     *     max=100,
     *     minMessage="Password must be between 6 and 100 characters long.",
     *     maxMessage="Password must be between 6 and 100 characters long."
     * )
     */
    protected $plainPassword;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $name;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $surname;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\DateTime(format="Y/m/d")
     */
    protected $birthDate;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SportEvent", mappedBy="creator_id")
     */
    private $sportEvents;

    public function __construct()
    {
        parent::__construct();
        $this->sportEvents = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * @param mixed $surname
     */
    public function setSurname($surname): void
    {
        $this->surname = $surname;
    }

    /**
     * @return mixed
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * @param mixed $birthDate
     */
    public function setBirthDate($birthDate): void
    {
        $this->birthDate = $birthDate;
    }

    /**
     * @return mixed
     */public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $created_at
     */
    public function setCreatedAt($createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param mixed $updated_at
     */
    public function setUpdatedAt($updatedAt): void
    {
        $this->updatedAt = $updatedAt;
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
            $sportEvent->setCreatorId($this);
        }

        return $this;
    }

    public function removeSportEvent(SportEvent $sportEvent): self
    {
        if ($this->sportEvents->contains($sportEvent)) {
            $this->sportEvents->removeElement($sportEvent);
            // set the owning side to null (unless already changed)
            if ($sportEvent->getCreatorId() === $this) {
                $sportEvent->setCreatorId(null);
            }
        }

        return $this;
    }
}
