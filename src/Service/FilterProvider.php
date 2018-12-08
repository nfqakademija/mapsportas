<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Filter;
use App\Normalizer\FilterNormalizer;

class FilterProvider
{
    private $filterNormalizer;

    public function __construct(FilterNormalizer $filterNormalizer)
    {
        $this->filterNormalizer = $filterNormalizer;
    }

    public function createFilterWithData(array $data): Filter
    {
        return $this->filterNormalizer->mapToEntity($data);
    }
}
