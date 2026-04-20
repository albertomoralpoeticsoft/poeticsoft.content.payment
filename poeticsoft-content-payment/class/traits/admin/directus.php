<?php

trait PCP_Admin_Directus {   

  public function register_pcp_admin_directus() {
    
  }
  
  

  public function directus_read() {

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