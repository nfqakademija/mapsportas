<?php

namespace App\Normalizer;

interface NormalizerInterface
{
    /**
     * @param $data
     * @return object
     */
    public function mapToArray($data);

    /**
     * @param array $data
     * @return array
     */
    public function mapToEntity(array $data);
}
