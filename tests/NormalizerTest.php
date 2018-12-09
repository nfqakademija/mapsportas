<?php
declare(strict_types=1);

namespace App\Tests;

use App\Normalizer\FilterNormalizer;
use App\Normalizer\NormalizerInterface;
use App\Normalizer\NotificationNormalizer;
use PHPUnit\Framework\TestCase;

class NormalizerTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();
    }

    public function testNotificationNormalizerInterface()
    {
        $notificationNormalizer = $this->createMock(NotificationNormalizer::class);
        $this->assertInstanceOf(NormalizerInterface::class, $notificationNormalizer);
    }

    public function testFilterNormalizerInterface()
    {
        $filterNormalizer = $this->createMock(FilterNormalizer::class);
        $this->assertInstanceOf(NormalizerInterface::class, $filterNormalizer);
    }
}
