<?php

namespace Poeticsoft\Heart\Domain;

use Poeticsoft\Heart\Infrastructure\Directus;
use Poeticsoft\Heart\Infrastructure\GoogleSheets;
use Poeticsoft\Heart\Persistence\Payment;
use Poeticsoft\Heart\Support\Settings;

class Payments
{
    private $settings;
    private $googleSheetsClient;
    private $directusClient;
    private $paymentRepository;

    public function __construct(
        Settings $settings,
        GoogleSheets $googleSheetsClient,
        Directus $directusClient,
        Payment $paymentRepository
    ) {
        $this->settings = $settings;
        $this->googleSheetsClient = $googleSheetsClient;
        $this->directusClient = $directusClient;
        $this->paymentRepository = $paymentRepository;
    }

    public function sync()
    {
        $campusAccessBy = $this->settings->get('campus_access_by', '');
        $accessData = [];

        switch ($campusAccessBy) {
            case 'gsheets':
                $accessData = $this->getPaymentsDataFromGSheets();
                break;

            case 'directus':
                $accessData = $this->getPaymentsDataFromDirectus();
                break;
        }

        $this->paymentRepository->replaceAll($accessData);

        return [
            'result' => 'ok',
            'data' => $accessData,
        ];
    }

    public function getPaymentsDataFromGSheets()
    {
        $sheetData = $this->googleSheetsClient->read();

        if (
            !isset($sheetData['result'])
            || $sheetData['result'] !== 'ok'
            || !isset($sheetData['data'])
        ) {
            return [];
        }

        return $this->normalizeRows($sheetData['data']);
    }

    public function getPaymentsDataFromDirectus()
    {
        $rows = $this->directusClient->fetchAccessRows();
        $normalized = [];

        foreach ($rows as $row) {
            $emailValue = isset($row->humano_id->correo) ? sanitize_email(trim($row->humano_id->correo)) : '';
            $postIdsValue = isset($row->wp_post_ids) ? trim($row->wp_post_ids) : '';
            $postIds = $postIdsValue === '' ? [] : explode(' ', $postIdsValue);

            $postIds = array_values(
                array_filter(
                    array_map(
                        static function ($postId) {
                            return (int) trim($postId);
                        },
                        $postIds
                    )
                )
            );

            if (empty($postIds)) {
                $normalized[] = [
                    'user_mail' => $emailValue,
                    'post_id' => 0,
                ];
                continue;
            }

            foreach ($postIds as $postId) {
                $normalized[] = [
                    'user_mail' => $emailValue,
                    'post_id' => get_post($postId) ? $postId : 0,
                ];
            }
        }

        return $normalized;
    }

    private function normalizeRows(array $rows)
    {
        $data = [];

        foreach ($rows as $row) {
            $emailValue = isset($row[0]) ? sanitize_email(trim($row[0])) : '';
            $postIdsValue = isset($row[1]) ? trim($row[1]) : '';
            $postIds = $postIdsValue === '' ? [] : explode(' ', $postIdsValue);
            $postIds = array_values(
                array_filter(
                    array_map(
                        static function ($postId) {
                            return (int) trim($postId);
                        },
                        $postIds
                    )
                )
            );

            if (empty($postIds)) {
                $data[] = [
                    'user_mail' => $emailValue,
                    'post_id' => 0,
                ];
                continue;
            }

            foreach ($postIds as $postId) {
                $data[] = [
                    'user_mail' => $emailValue,
                    'post_id' => get_post($postId) ? $postId : 0,
                ];
            }
        }

        return $data;
    }
}
