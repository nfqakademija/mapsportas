<?php
declare(strict_types=1);

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PublicResourceApiTest extends WebTestCase
{
    /**
     * @var Client
     */
    private $client;

    public function setUp()
    {
        parent::setUp();
        $this->client = self::createClient();
    }

    public function testPublicSportEventsResponse()
    {
        $this->client->request('POST', '/api/public/sport/events', [], [], [], json_encode(['perPage' => 10, 'first' => 1]));
        $response = $this->client->getResponse();

        $this->assertTrue($response->isSuccessful());
    }

    public function testAmountOfSportEventsReturned()
    {
        $perPage = 10;
        $this->client->request('POST', '/api/public/sport/events', [], [], [], json_encode(['perPage' => $perPage, 'first' => 1]));
        $response = $this->client->getResponse();

        $contents = json_decode($response->getContent(), true);

        $this->assertSame($perPage, count($contents['sportEvents']));
    }

    public function testGetUpcomingEvents()
    {
        $perPage = 14;
        $this->client->request('GET', '/api/public/sport/events/upcoming/' . $perPage . '/' . 1);
        $response = $this->client->getResponse();
        $contents = json_decode($response->getContent(), true);

        $this->assertSame($perPage, count($contents));
    }
}
