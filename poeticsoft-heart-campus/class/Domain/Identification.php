<?php

namespace Poeticsoft\Heart\Domain;

use Poeticsoft\Heart\Infrastructure\Mailrelay;
use Poeticsoft\Heart\Persistence\Payment;
use Poeticsoft\Heart\Support\Logger;
use Poeticsoft\Heart\Support\Settings;

class Identification
{
    private $settings;
    private $accessService;
    private $mailrelayClient;
    private $paymentRepository;
    private $logger;

    public function __construct(
        Settings $settings,
        Access $accessService,
        Mailrelay $mailrelayClient,
        Payment $paymentRepository,
        Logger $logger
    ) {
        $this->settings = $settings;
        $this->accessService = $accessService;
        $this->mailrelayClient = $mailrelayClient;
        $this->paymentRepository = $paymentRepository;
        $this->logger = $logger;
    }

    public function registerOrIdentify($email)
    {
        $userCode = wp_rand(100000, 999999);
        $transientKey = $this->verificationTransientKey($email);

        set_transient(
            $transientKey,
            [
                'email' => $email,
                'code' => (string) $userCode,
            ],
            15 * MINUTE_IN_SECONDS
        );

        $this->accessService->setIdentityCookies($email, false);
        setcookie(
            'usercode',
            (string) $userCode,
            0,
            '/',
            COOKIE_DOMAIN,
            is_ssl(),
            true
        );

        $siteName = get_bloginfo('name');
        $siteDescription = get_bloginfo('description');
        $siteUrl = get_bloginfo('url');

        wp_mail(
            $email,
            '[' . $siteName . '] Confirma tu codigo',
            "El codigo para identificarte es: {$userCode}\n\n{$siteName}\n{$siteDescription}\n{$siteUrl}"
        );

        return $userCode;
    }

    public function checkTemporalCode($code)
    {
        if (!(bool) $this->settings->get('campus_use_temporalcode', false)) {
            return [
                'result' => 'error',
                'message' => 'No esta permitido el uso del codigo',
            ];
        }

        $temporalCode = (string) $this->settings->get('campus_temporal_access_code', '');
        $temporalMail = (string) $this->settings->get('campus_temporal_access_mail', '');

        if ((string) $code !== $temporalCode) {
            return [
                'result' => 'error',
                'message' => 'El codigo es incorrecto',
            ];
        }

        $this->accessService->setIdentityCookies($temporalMail, true);

        return [
            'result' => 'ok',
        ];
    }

    public function registerSubscriber($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                'result' => 'error',
                'message' => 'Invalid email format',
            ];
        }

        $identifyUrl = trim((string) $this->settings->get('identify_api_url', ''));
        $identifyKey = trim((string) $this->settings->get('identify_api_key', ''));

        if ($identifyUrl === '' || $identifyKey === '') {
            return [
                'result' => 'error',
                'message' => 'Identify API configuration incomplete',
            ];
        }

        $url = trailingslashit($identifyUrl) . 'api/v1/subscribers';
        $response = wp_remote_post(
            $url,
            [
                'headers' => [
                    'X-AUTH-TOKEN' => $identifyKey,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'body' => wp_json_encode(
                    [
                        'email' => $email,
                        'status' => 'active',
                        'group_ids' => [8],
                    ]
                ),
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

        if (isset($data['errors'])) {
            return [
                'result' => 'error',
                'data' => $data,
            ];
        }

        $userCode = $this->registerOrIdentify($email);

        return [
            'result' => 'ok',
            'usercode' => $userCode,
            'data' => $data,
        ];
    }

    public function identifySubscriber($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                'result' => 'error',
                'message' => 'Invalid email format',
            ];
        }

        $accessType = (string) $this->settings->get('campus_access_by', '');

        switch ($accessType) {
            case 'mailrelay':
                $result = $this->mailrelayClient->findSubscriberByEmail($email);
                if (!isset($result['result']) || $result['result'] !== 'ok') {
                    return $result;
                }

                $userCode = $this->registerOrIdentify($email);

                return [
                    'result' => 'ok',
                    'code' => $userCode,
                    'data' => $result['data'],
                ];

            case 'gsheets':
            case 'directus':
                $payments = $this->paymentRepository->findByEmail($email);
                if (count($payments) === 0) {
                    return [
                        'result' => 'error',
                        'data' => 'notfound',
                    ];
                }

                $userCode = $this->registerOrIdentify($email);

                return [
                    'result' => 'ok',
                    'code' => $userCode,
                    'data' => $payments[0],
                ];

            default:
                return [
                    'result' => 'error',
                    'message' => 'Metodo de identificacion no existe',
                ];
        }
    }

    public function confirmCode($email, $code)
    {
        $verification = get_transient($this->verificationTransientKey($email));

        if (
            !is_array($verification)
            || !isset($verification['email'], $verification['code'])
            || $verification['email'] !== $email
            || (string) $verification['code'] !== (string) $code
        ) {
            $this->accessService->clearIdentityCookies();

            return [
                'result' => 'error',
                'message' => 'El codigo no es correcto.',
            ];
        }

        delete_transient($this->verificationTransientKey($email));
        $this->accessService->setIdentityCookies($email, true);

        return [
            'result' => 'ok',
        ];
    }

    private function verificationTransientKey($email)
    {
        return 'phc_identify_' . md5(strtolower(trim($email)));
    }
}
