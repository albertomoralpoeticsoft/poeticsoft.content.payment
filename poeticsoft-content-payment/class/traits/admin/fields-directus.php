<?php
trait PCP_Admin_Fields_Directus {  

  public function register_pcp_admin_fields_directus() {

    self::$adminfields = array_merge(
      self::$adminfields,
      [
        [
          'key' => 'directus_endpoint_sync_access',
          'field_type' => 'string',
          'title' => 'Sincronizacion de Humanos/Páginas',
          'description' => 'Sincronizacion de Humanos/Páginas',
          'value' => 'https://matriz.reconectar.org/items/magia?fields=humano_id.correo,wp_post_ids&filter[wp_post_ids][_nnull]=true&limit=-1',
          'section' => 'directus'
        ],

        [
          'key' => 'directus_endpoint_sync_access_token',
          'field_type' => 'string',
          'title' => 'Token para Sincronizacion de Humanos/Páginas',
          'description' => 'Token para Sincronizacion de Humanos/Páginas',
          'value' => 'dF_ISg6A0P2ugMAkVbBxQFXag9dBSFtQ',
          'section' => 'directus'
        ],
        
        [
          'key' => 'directus_endpoint_log_access',
          'field_type' => 'string',
          'title' => 'Url registro en log de accesos',
          'description' => 'Url registro en log de accesos',
          'value' => 'https://matriz.reconectar.org/items/log_accesos',
          'section' => 'directus'
        ],

        [
          'key' => 'directus_endpoint_log_access_token',
          'field_type' => 'string',
          'title' => 'Token registro en log de accesos',
          'description' => 'Token registro en log de accesos',
          'value' => 'MMqlGZF1UJOQ0hg5meq2MKqGwMxRnRXE',
          'section' => 'directus'
        ]
      ]
    );    
  }
}
