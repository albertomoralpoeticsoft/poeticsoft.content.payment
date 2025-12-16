<?php
trait PCPT_Admin_Fields_Stripe {  

  public function register_pcpt_admin_fields_stripe() {

    self::$adminfields = array_merge(
      self::$adminfields,
      [

        [
          'key' => 'stripe_publicable_key',
          'field_type' => 'string',
          'title' => 'Stripe Publicable Key',
          'description' => 'Stripe Publicable Key Description',
          'value' => '',
          'section' => 'stripe'
        ],

        [
          'key' => 'stripe_secret_key',
          'field_type' => 'string',
          'title' => 'Stripe Secret Key',
          'description' => 'Stripe Publicable Key Description',
          'value' => '',
          'section' => 'stripe'
        ],

        [
          'key' => 'stripe_signature_key',
          'field_type' => 'string',
          'title' => 'Stripe Signature Key',
          'description' => 'Stripe Publicable Key Description',
          'value' => '',
          'section' => 'stripe'
        ],

        [
          'key' => 'stripe_success_url',
          'field_type' => 'string',
          'title' => 'Stripe Success Url',
          'description' => 'Stripe Publicable Key Description',
          'value' => '/suscription-success/',
          'section' => 'stripe'
        ],

        [
          'key' => 'stripe_cancel_url',
          'field_type' => 'string',
          'title' => 'Stripe Cancel Url',
          'description' => 'Stripe Publicable Key Description',
          'value' => '/suscription-cancel/',
          'section' => 'stripe'
        ]
      ]
    );    
  }
}
