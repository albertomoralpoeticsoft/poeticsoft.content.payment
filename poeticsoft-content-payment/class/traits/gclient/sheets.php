<?php

require WP_PLUGIN_DIR . '/poeticsoft-content-payment/tools/gauth/vendor/autoload.php';

use Google\Auth\Credentials\ServiceAccountCredentials;
use Google\Auth\Middleware\AuthTokenMiddleware;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;

trait PCP_GClient_Sheets {

  public function register_pcp_gclient_sheets() {

  
  }

  public function gclient_sheet_read() {

    // https://docs.google.com/spreadsheets/d/1CLpVE1S_mjKczIkc2e6xfYmxLPVtdNBKAwo8wNu4Hcw/edit?usp=sharing_eip&ts=697b4e63

    try {

      $credfilename = get_option('pcp_settings_gclient_cred');
      $alumnossheetid = get_option('pcp_settings_gclient_sheet_alumnos_id');
      $credfile = self::$dir . 'cred/' . $credfilename . '.json';
      $scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';
      $creds = new ServiceAccountCredentials($scope, $credfile);
      $middleware = new AuthTokenMiddleware($creds);
      $stack = HandlerStack::create();
      $stack->push($middleware);
      $client = new Client([
        'handler' => $stack,
        'auth' => 'google_auth'
      ]);
      $metaUrl = "https://sheets.googleapis.com/v4/spreadsheets/$alumnossheetid?fields=sheets.properties.title";
      $metaResponse = $client->get($metaUrl);
      $metaData = json_decode($metaResponse->getBody(), true);
      $firstSheetName = $metaData['sheets'][0]['properties']['title'] ?? 'Hoja1';
      $range = rawurlencode($firstSheetName); 
      $url = "https://sheets.googleapis.com/v4/spreadsheets/$alumnossheetid/values/$range";
      $response = $client->get($url);
      $data = json_decode($response->getBody(), true); 
      $values = $data['values'] ?? [];
      $header = array_shift($values);

      return [
        'result' => 'ok',
        'header' => $header,
        'data' => $values
      ];

    } catch (Exception $e) {

      return [
        'result' => 'error',
        'reason' => $e->getMessage()
      ];
    }    
  }
}