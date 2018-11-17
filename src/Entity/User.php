<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;

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
     *
     * @Groups({"user","sportEvent"})
     */
    protected $id;

    /**
     * @Assert\NotBlank(message="Email is required")
     * @Assert\Email(message="This email is invalid")
     *
     * @Groups({"user"})
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
     *
     * @Groups({"user","sportEvent"})
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
     *
     * @Groups({"user"})
     */
    protected $name;

    /**
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({"user"})
     */
    protected $surname;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\DateTime(format="Y/m/d")
     *
     * @Groups({"user"})
     */
    protected $birthDate;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"user"})
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"user"})
     */
    protected $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SportEvent", mappedBy="creator")
     *
     * @Groups({"user"})
     */
    private $sportEvents;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\EventApplication", mappedBy="user")
     *
     * @Groups({"user"})
     */
    private $userApplications;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\File(mimeTypes={ "image/png", "image/jpeg" })
     */
    private $avatar;

    public function __construct()
    {
        parent::__construct();
        $this->sportEvents = new ArrayCollection();
        $this->userApplications = new ArrayCollection();
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
     */
    public function getCreatedAt()
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
            $sportEvent->setCreator($this);
        }

        return $this;
    }

    public function removeSportEvent(SportEvent $sportEvent): self
    {
        if ($this->sportEvents->contains($sportEvent)) {
            $this->sportEvents->removeElement($sportEvent);
            // set the owning side to null (unless already changed)
            if ($sportEvent->getCreator() === $this) {
                $sportEvent->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|EventApplication[]
     */
    public function getUserApplications(): Collection
    {
        return $this->userApplications;
    }

    public function addUserApplication(EventApplication $userApplication): self
    {
        if (!$this->userApplications->contains($userApplication)) {
            $this->userApplications[] = $userApplication;
            $userApplication->setUser($this);
        }

        return $this;
    }

    public function removeUserApplication(EventApplication $userApplication): self
    {
        if ($this->userApplications->contains($userApplication)) {
            $this->userApplications->removeElement($userApplication);
            // set the owning side to null (unless already changed)
            if ($userApplication->getUser() === $this) {
                $userApplication->setUser(null);
            }
        }

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
}
