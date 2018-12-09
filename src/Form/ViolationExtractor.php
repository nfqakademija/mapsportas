<?php
declare(strict_types=1);

namespace App\Form;

use App\Entity\FormViolation;
use Symfony\Component\Form\FormInterface;

class ViolationExtractor
{
    public function extract(FormInterface $form, string $replace = 'data.'): array
    {
        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            if ($error->getCause()) {
                $violation = new FormViolation();
                $violation->setField(str_replace($replace, '', $error->getCause()->getPropertyPath()));
                $violation->setViolationMessage($error->getMessage());
                $errors[] = $violation;
            }
        }

        return $errors;
    }
}
