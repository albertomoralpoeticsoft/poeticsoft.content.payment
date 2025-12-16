<?php
trait PCPT_Admin_Fields_Mailrelay {  

  public function register_pcpt_admin_fields_mailrelay() {

    self::$adminfields = array_merge(
      self::$adminfields,
      [
        [
          'key' => 'mailrelay_api_url',
          'field_type' => 'string',
          'title' => 'Api URL',
          'description' => 'Stripe Publicable Key Description',
          'value' => '',
          'section' => 'mailrelay'
        ],

        [
          'key' => 'mailrelay_api_key',
          'field_type' => 'string',
          'title' => 'Api KEY',
          'description' => 'Stripe Publicable Key Description',
          'value' => '',
          'section' => 'mailrelay'
        ],
      ]
    );    
  }
}
