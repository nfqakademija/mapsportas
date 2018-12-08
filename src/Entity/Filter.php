<?php
declare(strict_types=1);

namespace App\Entity;

use DateTimeImmutable;

class Filter
{
    /**
     * @var int
     */
    private $itemsPerPage;

    /**
     * @var int
     */
    private $first;

    /**
     * @var DateTimeImmutable
     */
    private $fromDate;

    /**
     * @var DateTimeImmutable
     */
    private $toDate;

    /**
     * @var string[]
     */
    private $context;

    /**
     * @return int
     */
    public function getItemsPerPage()
    {
        return $this->itemsPerPage;
    }

    /**
     * @param int $itemsPerPage
     *
     * @return $this
     */
    public function setItemsPerPage(int $itemsPerPage)
    {
        $this->itemsPerPage = $itemsPerPage;

        return $this;
    }

    /**
     * @return int
     */
    public function getFirst()
    {
        return $this->first;
    }

    /**
     * @param int $first
     *
     * @return $this
     */
    public function setFirst(int $first)
    {
        $this->first = $first;

        return $this;
    }

    /**
     * @return DateTimeImmutable
     */
    public function getFromDate()
    {
        return $this->fromDate;
    }

    /**
     * @param DateTimeImmutable $fromDate
     *
     * @return $this
     */
    public function setFromDate(DateTimeImmutable $fromDate)
    {
        $this->fromDate = $fromDate;

        return $this;
    }

    /**
     * @return DateTimeImmutable
     */
    public function getToDate()
    {
        return $this->toDate;
    }

    /**
     * @param DateTimeImmutable $toDate
     *
     * @return $this
     */
    public function setTo(DateTimeImmutable $toDate)
    {
        $this->toDate = $toDate;

        return $this;
    }

    /**
     * @param string $key
     *
     * @return string|string[]
     */
    public function getContext(string $key)
    {
        if (isset($this->context[$key])) {
            return $this->context[$key];
        }

        return $this->context;
    }

    public function hasInContext(string $key)
    {
        return isset($this->context[$key]) ? true : false;
    }

    /**
     * @param string|string[] $context
     *
     * @return $this
     */
    public function setContext(array $context)
    {
        foreach ($context as $key => $value) {
            if (in_array($key, ['sportId', 'min', 'max'], true)) {
                $this->context[$key] = $value;
            }
        }

        return $this;
    }
}
