<?php

namespace Poeticsoft\Heart\Infrastructure;

use Poeticsoft\Heart\Support\Logger;
use Poeticsoft\Heart\Support\Settings;

class Directus
{
    private $settings;
    private $logger;

    public function __construct(Settings $settings, Logger $logger)
    {
        $this->settings = $settings;
        $this->logger = $logger;
    }

    public function fetchAccessRows()
    {
        $endpoint = trim((string) $this->settings->get('directus_endpoint_sync_access', ''));
        $token = trim((string) $this->settings->get('directus_endpoint_sync_access_token', ''));

        if ($endpoint === '') {
            return [];
        }

        $response = wp_remote_get(
            $endpoint,
            [
                'headers' => [
                    'Authorization' => $token !== '' ? 'Bearer ' . $token : '',
                    'Content-Type' => 'application/json',
                ],
                'timeout' => 30,
            ]
        );

        if (is_wp_error($response)) {
            $this->logger->log($response->get_error_message(), true);
            return [];
        }

        $status = wp_remote_retrieve_response_code($response);
        if ((int) $status !== 200) {
            return [];
        }

        $body = wp_remote_retrieve_body($response);
        $decoded = json_decode($body);

        if (!is_object($decoded) || !isset($decoded->data) || !is_array($decoded->data)) {
            return [];
        }

        return $decoded->data;
    }

    public function logAccess(array $body)
    {
        $endpoint = trim((string) $this->settings->get('directus_endpoint_log_access', ''));
        $token = trim((string) $this->settings->get('directus_endpoint_log_access_token', ''));

        if ($endpoint === '') {
            return false;
        }

        $response = wp_remote_post(
            $endpoint,
            [
                'method' => 'POST',
                'timeout' => 45,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => false,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => $token !== '' ? 'Bearer ' . $token : '',
                ],
                'body' => wp_json_encode($body),
                'cookies' => [],
            ]
        );

        if (is_wp_error($response)) {
            $this->logger->log($response->get_error_message(), true);
            return false;
        }

        return true;
    }
}
