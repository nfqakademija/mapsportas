<?php
declare(strict_types=1);

namespace App\Entity;

class FormViolation
{
    /**
     * @var string
     */
    private $field;

    /**
     * @var string
     */
    private $violationMessage;

    /**
     * @return string
     */
    public function getField()
    {
        return $this->field;
    }

    /**
     * @param string $field
     *
     * @return $this
     */
    public function setField(string $field)
    {
        $this->field = $field;

        return $this;
    }

    /**
     * @return string
     */
    public function getViolationMessage()
    {
        return $this->violationMessage;
    }

    /**
     * @param string $violationMessage
     *
     * @return $this
     */
    public function setViolationMessage(string $violationMessage)
    {
        $this->violationMessage = $violationMessage;

        return $this;
    }
}
