<?php

add_filter(
  'admin_init', 
  function () {         

    add_settings_section(
      'poeticsoft_content_payment_settings_stripe', 
      '📧 Ajustes de conexión con stripe',
      function() {        
        echo '<p>Configuracion y ajustes para la gestión y procesos de pagos stripe.</p>';
      },
      'general'
    );      

    add_settings_section(
      'poeticsoft_content_payment_settings_campus', 
      '📧 Ajustes del entorno de contenidos del campus',
      function() {        
        echo '<p>Configuracion y ajustes de elementos que organizan el campus, contenidos, usuarios, precios etc.</p>';
      },
      'general'
    );  

    add_settings_section(
      'poeticsoft_content_payment_settings_smtp', 
      '📧 Ajustes de conexión del servidor de correo (Basic)',
      function() {        
        echo '<p>Configura la conexión con el servidor SMTP de salida de correos.</p>';
      },
      'general'
    );   

    add_settings_section(
      'poeticsoft_content_payment_settings_mailrelay', 
      '📧 Comunicaciones Mail Relay',
      function() {
          echo '<p>Datos para usar la API de Mail Relay.</p>';
      },
      'general'
    );

    $fields = [

      // Stripe

      'stripe_publicable_key' => [
        'title' => 'Stripe Publicable Key',
        'value' => '',
        'section' => 'poeticsoft_content_payment_settings_stripe'
      ],

      'stripe_secret_key' => [
        'title' => 'Stripe Secret Key',
        'value' => '',
        'section' => 'poeticsoft_content_payment_settings_stripe'
      ],

      'stripe_signature_key' => [
        'title' => 'Stripe Signature Key',
        'value' => 'whsec_JMMMLDQonvqyzeREX0XkgfMzbE8Z4OO3',
        'section' => 'poeticsoft_content_payment_settings_stripe'
      ],

      'stripe_success_url' => [
        'title' => 'Stripe Success Url',
        'value' => '/suscription-success/',
        'section' => 'poeticsoft_content_payment_settings_stripe'
      ],

      'stripe_cancel_url' => [
        'title' => 'Stripe Cancel Url',
        'value' => '/suscription-cancel/',
        'section' => 'poeticsoft_content_payment_settings_stripe'
      ],

      // Campus

      'campus_root_post_id' => [
        'title' => 'Campus Root Post Id',
        'value' => 0,
        'section' => 'poeticsoft_content_payment_settings_campus',
        'width' => 80
      ],

      'campus_suscription_duration' => [
        'title' => 'Suscription Duration (Months)',
        'type' => 'number',
        'value' => 12,
        'section' => 'poeticsoft_content_payment_settings_campus',
        'width' => 80
      ],

      'campus_payment_currency' => [
        'title' => 'Campus Payment Currency',
        'value' => 'eur',
        'section' => 'poeticsoft_content_payment_settings_campus',
        'width' => 80
      ],

      // SMTP

      'mail_host' => [
        'title' => 'Mail Host',
        'value' => 'smtp.mail.ovh.net',
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      'mail_port' => [
        'title' => 'Mail Port',
        'value' => 465,
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      'mail_smtpsecure' => [
        'title' => 'SMTP Secure',
        'value' => 'ssl',
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      'mail_username' => [
        'title' => 'Mail Username',
        'value' => 'partners@poeticsoft.com',
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      'mail_username' => [
        'title' => 'Mail Username',
        'value' => 'partners@poeticsoft.com',
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      'mail_password' => [
        'title' => 'Mail Password',
        'value' => 'JsAU8)0987654',
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      'mail_from' => [
        'title' => 'Mail From',
        'value' => 'partners@poeticsoft.com',
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      'mail_fromname' => [
        'title' => 'Mail From Name',
        'value' => 'Poeticsoft Partners',
        'section' => 'poeticsoft_content_payment_settings_smtp'
      ],

      // Mail Relay

      'mailrelay_api_url' => [
        'title' => 'Api URL',
        'value' => 'https://noshibari.ipzmarketing.com',
        'section' => 'poeticsoft_content_payment_settings_mailrelay'
      ],

      'mailrelay_api_key' => [
        'title' => 'Api KEY',
        'value' => 'pcDhEKHCzBwimEzE4VX_1RmyAYkyxN9zsP_dsHcp',
        'section' => 'poeticsoft_content_payment_settings_mailrelay'
      ],


    ];

    foreach($fields as $key => $field) {

      register_setting(
        'general', 
        'poeticsoft_content_payment_settings_' . $key
      );

      add_settings_field(
        'poeticsoft_content_payment_settings_' . $key, 
        '<label for="poeticsoft_content_payment_settings_' . $key . '">' . 
          __($field['title']) .
        '</label>',
        function () use ($key, $field){

          $value = get_option('poeticsoft_content_payment_settings_' . $key, $field['value']);

          if(isset($field['type'])) {

            if('checkbox' == $field['type']) {

              echo '<input type="checkbox" 
                           id="poeticsoft_content_payment_settings_' . $key . '" 
                           name="poeticsoft_content_payment_settings_' . $key . '" 
                           class="regular-text"
                           ' . ($value ? 'checked="chedked"' : '') . ' />';

            }

            if('number' == $field['type']) {

              echo '<input type="number" 
                           id="poeticsoft_content_payment_settings_' . $key . '" 
                           name="poeticsoft_content_payment_settings_' . $key . '" 
                           class="regular-text"
                           value="' . $value . '" ' .
                           (isset($field['width']) ? 'style="width: ' . $field['width'] . 'px;"' : '') .
                           '/>';

            } 

            if('textarea' == $field['type']) {

              echo '<textarea id="poeticsoft_content_payment_settings_' . $key . '" 
                              name="poeticsoft_content_payment_settings_' . $key . '" 
                              class="regular-text" ' .
                              (isset($field['width']) ? 'style="width: ' . $field['width'] . 'px;"' : ' ') .
                              'rows="4">' .
                              $value . 
                              '</textarea>';

            } 
            
          } else {

            echo '<input type="text" 
                         id="poeticsoft_content_payment_settings_' . $key . '" 
                         name="poeticsoft_content_payment_settings_' . $key . '" 
                         class="regular-text"
                         value="' . $value . '" ' .
                         (isset($field['width']) ? 'style="width: ' . $field['width'] . 'px;"' : '') .
                         '/>';
          }
        },
        'general',
        $field['section']
      );  
    }  
  }
);

?>