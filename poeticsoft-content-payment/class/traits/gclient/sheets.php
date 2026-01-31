<?php

require WP_PLUGIN_DIR . '/poeticsoft-content-payment/tools/gclient/vendor/autoload.php';

use Google\Client;
use Google\Service\Sheets;
use Google\Service\Drive;

trait PCP_GClient_Sheets {

  public function register_pcp_gclient_sheets() {

  
  }

  public function gclient_sheet_get_filedata() {
    
    try {

      $credfilename = get_option('pcp_settings_gclient_cred');
      $alumnossheetid = get_option('pcp_settings_gclient_sheet_alumnos_id');
      $credfile = self::$dir . 'cred/' . $credfilename . '.json';

      $client = new Client();
      $client->setAuthConfig($credfile);
      $client->setApplicationName('Poeticsoft');
      $client->setScopes([Drive::DRIVE]);
      $driveService = new Drive($client);
      $sheetfile = $driveService->files->get(
        $alumnossheetid, 
        [
          'fields' => 'modifiedTime',
          'supportsAllDrives' => true
        ]
      );   
      $fecha_iso = $sheetfile->getModifiedTime();
      $date = new DateTime($fecha_iso);
      $dateformated = $date->format('Y-m-d H:i:s');  

      return [
        'result' => 'ok',
        'modifiedtime' => $dateformated
      ];

    } catch (Exception $e) {

      return [
        'result' => 'error',
        'reason' => $e->getMessage()
      ];
    }
  }

  public function gclient_sheet_read() {

    try {

      $credfilename = get_option('pcp_settings_gclient_cred');
      $alumnossheetid = get_option('pcp_settings_gclient_sheet_alumnos_id');
      $credfile = self::$dir . 'cred/' . $credfilename . '.json';

      $client = new Client();
      $client->setApplicationName('Poeticsoft');
      $client->setScopes([Sheets::SPREADSHEETS_READONLY]);
      $client->setAuthConfig($credfile);
      $client->setAccessType('offline');
      $service = new Sheets($client);
      $spreadsheet = $service->spreadsheets->get($alumnossheetid);
      $sheets = $spreadsheet->getSheets();
      $firstSheetTitle = $sheets[0]->getProperties()->getTitle();
      $response = $service->spreadsheets_values->get($alumnossheetid, $firstSheetTitle);
      $values = $response->getValues();
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