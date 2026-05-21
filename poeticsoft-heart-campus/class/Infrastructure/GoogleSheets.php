<?php

namespace Poeticsoft\Heart\Infrastructure;

use Poeticsoft\Heart\Support\Environment;
use Poeticsoft\Heart\Support\Settings;

class GoogleSheets
{
    private $environment;
    private $settings;
    private $autoloadLoaded = false;

    public function __construct(Environment $environment, Settings $settings)
    {
        $this->environment = $environment;
        $this->settings = $settings;
    }

    public function read()
    {
        try {
            $autoloadPath = $this->environment->path('tools/gauth/vendor/autoload.php');
            if (!$this->autoloadLoaded && file_exists($autoloadPath)) {
                require_once $autoloadPath;
                $this->autoloadLoaded = true;
            }

            if (!class_exists('Google\\Auth\\Credentials\\ServiceAccountCredentials')) {
                return [
                    'result' => 'error',
                    'reason' => 'Google auth library not found',
                ];
            }

            $credFilename = $this->settings->get('gclient_cred', '');
            $sheetId = $this->settings->get('gclient_sheet_alumnos_id', '');

            if ($credFilename === '' || $sheetId === '') {
                return [
                    'result' => 'error',
                    'reason' => 'Google Sheets configuration incomplete',
                ];
            }

            $credFile = $this->environment->path('cred/' . $credFilename . '.json');
            if (!file_exists($credFile)) {
                return [
                    'result' => 'error',
                    'reason' => 'Google credentials file not found',
                ];
            }

            $scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';
            $creds = new \Google\Auth\Credentials\ServiceAccountCredentials($scope, $credFile);
            $middleware = new \Google\Auth\Middleware\AuthTokenMiddleware($creds);
            $stack = \GuzzleHttp\HandlerStack::create();
            $stack->push($middleware);
            $client = new \GuzzleHttp\Client([
                'handler' => $stack,
                'auth' => 'google_auth',
            ]);

            $metaUrl = "https://sheets.googleapis.com/v4/spreadsheets/{$sheetId}?fields=sheets.properties.title";
            $metaResponse = $client->get($metaUrl);
            $metaData = json_decode((string) $metaResponse->getBody(), true);
            $firstSheetName = isset($metaData['sheets'][0]['properties']['title'])
                ? $metaData['sheets'][0]['properties']['title']
                : 'Hoja1';
            $range = rawurlencode($firstSheetName);
            $url = "https://sheets.googleapis.com/v4/spreadsheets/{$sheetId}/values/{$range}";
            $response = $client->get($url);
            $data = json_decode((string) $response->getBody(), true);
            $values = isset($data['values']) ? $data['values'] : [];
            $header = array_shift($values);

            return [
                'result' => 'ok',
                'header' => $header,
                'data' => $values,
            ];
        } catch (\Exception $exception) {
            return [
                'result' => 'error',
                'reason' => $exception->getMessage(),
            ];
        }
    }
}
