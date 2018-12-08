<?php
declare(strict_types=1);

namespace App\Normalizer;

use App\Entity\Filter;
use DateTimeImmutable;

class FilterNormalizer implements NormalizerInterface
{
    public function mapToEntity(array $data): Filter
    {
        $filter = new Filter();
        $filter->setFromDate(new DateTimeImmutable('now'));
        if (isset($data['perPage'])) {
            $filter->setItemsPerPage($data['perPage']);
        }
        if (isset($data['first'])) {
            $filter->setFirst($data['first']);
        }
        if (isset($data['sportId']) && $data['sportId'] != 0) {
            $filter->setContext(['sportId' => $data['sportId']]);
        }
        if (isset($data['from'])) {
            $filter->setFromDate(new DateTimeImmutable($data['from']));
        }
        if (isset($data['to']) && $data['to'] !== '') {
            $filter->setTo(new DateTimeImmutable($data['to']));
        }
        if (isset($data['min'])) {
            $filter->setContext(['min' => $data['min']]);
        }
        if (isset($data['max'])) {
            $filter->setContext(['max' => $data['max']]);
        }
        return $filter;
    }

    public function mapToArray($object): array
    {
        return [];
    }
}
