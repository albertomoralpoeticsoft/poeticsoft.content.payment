<?php
trait PCPT_Admin_Fields_Campus {  

  public function register_pcpt_admin_fields_campus() {

    self::$adminfields = array_merge(
      self::$adminfields,
      [
        [
          'key' => 'campus_roles_access',
          'field_type' => 'boolean',
          'title' => 'Acceso administradores',
          'description' => 'Stripe Publicable Key Description',
          'value' => false,
          'type' => 'checkbox',
          'section' => 'campus'
        ],

        [
          'key' => 'campus_use_temporalcode',
          'field_type' => 'boolean',
          'title' => 'Usar código temporal',
          'description' => 'Usar código temporal',
          'value' => false,
          'type' => 'checkbox',
          'section' => 'campus'
        ],

        [
          'key' => 'campus_temporal_access_mail',
          'field_type' => 'string',
          'title' => 'Mail de acceso temporal',
          'description' => 'Mail de acceso temporal',
          'value' => 0,
          'section' => 'campus'
        ],

        [
          'key' => 'campus_temporal_access_code',
          'field_type' => 'string',
          'title' => 'Código de acceso temporal',
          'description' => 'Código de acceso temporal',
          'value' => 0,
          'section' => 'campus',
          'width' => 140
        ],

        [
          'key' => 'campus_root_post_id',
          'field_type' => 'number',
          'title' => 'Campus Root Post Id',
          'description' => 'Stripe Publicable Key Description',
          'value' => 0,
          'section' => 'campus',
          'width' => 80
        ],

        [
          'key' => 'campus_suscription_duration',
          'field_type' => 'number',
          'title' => 'Suscription Duration (Months)',
          'description' => 'Stripe Publicable Key Description',
          'type' => 'number',
          'value' => 12,
          'section' => 'campus',
          'width' => 80
        ],

        [
          'key' => 'campus_payment_currency',
          'field_type' => 'string',
          'title' => 'Campus Payment Currency',
          'description' => 'Stripe Publicable Key Description',
          'value' => 'eur',
          'section' => 'campus',
          'width' => 80
        ],
      ]
    );    
  }
}
