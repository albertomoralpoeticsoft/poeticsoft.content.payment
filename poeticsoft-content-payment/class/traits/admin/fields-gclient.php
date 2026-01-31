<?php
trait PCP_Admin_Fields_GClient {  

  public function register_pcp_admin_fields_gclient() {

    self::$adminfields = array_merge(
      self::$adminfields,
      [
        [
          'key' => 'gclient_cred',
          'field_type' => 'string',
          'title' => 'Google Client Credentials File',
          'description' => 'Google Client Credentials File',
          'value' => '',
          'section' => 'gclient'
        ],
        [
          'key' => 'gclient_sheet_alumnos_id',
          'field_type' => 'string',
          'title' => 'Alumnos Sheet id',
          'description' => 'Identificacor del doc Sheet con la lista de alumnos / posts',
          'value' => '',
          'section' => 'gclient'
        ],
        [
          'key' => 'gclient_sheet_alumnos_lastmodificationdate',
          'field_type' => 'string',
          'title' => 'Fecha de última modificacion de Alumnos Sheet',
          'description' => 'Fecha de última modificacion de Alumnos Sheet',
          'value' => '',
          'section' => 'gclient',
          'width' => 160
        ]
      ]
    );    
  }
}
