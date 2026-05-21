<?php

namespace Poeticsoft\Heart\Infrastructure;

use Poeticsoft\Heart\Support\Settings;

class Mailrelay
{
    private $settings;

    public function __construct(Settings $settings)
    {
        $this->settings = $settings;
    }

    public function findSubscriberByEmail($email)
    {
        $identifyUrl = trim((string) $this->settings->get('mailrelay_api_url', ''));
        $identifyKey = trim((string) $this->settings->get('mailrelay_api_key', ''));

        if ($identifyUrl === '' || $identifyKey === '') {
            return [
                'result' => 'error',
                'message' => 'Mailrelay configuration incomplete',
            ];
        }

        $url = trailingslashit($identifyUrl) . 'api/v1/subscribers?q[email_eq]=' . rawurlencode($email);
        $response = wp_remote_get(
            $url,
            [
                'headers' => [
                    'X-AUTH-TOKEN' => $identifyKey,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
            ]
        );

        if (is_wp_error($response)) {
            return [
                'result' => 'error',
                'message' => $response->get_error_message(),
            ];
        }

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if (!is_array($data) || empty($data)) {
            return [
                'result' => 'error',
                'data' => 'No se ha encontrado',
            ];
        }

        return [
            'result' => 'ok',
            'data' => $data[0],
        ];
    }
}
