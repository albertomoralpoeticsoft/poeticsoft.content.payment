<?php

trait PCPT_API_Pay_Notify {  
  
  public function pay_notify_texts($type) {

    $types = [
      'stripe' => [
        'subject' => 'Se ha creado pay Stripe',
        'body' => 'Se ha creado pay Stripe'
      ],
      'bizum' => [
        'subject' => 'Se ha creado pay Bizum',
        'body' => 'Se ha creado pay Bizum'
      ],
      'transfer' => [
        'subject' => 'Se ha creado pay Transfer',
        'body' => 'Se ha creado pay Transfer'
      ]
    ];

    return $types[$type];
  }

  public function pay_notify(&$data) {

    $texts = poeticsoft_content_payment_pay_notify_texts($data['type']);

    $data['notified'] = wp_mail(
      $data['email'],
      '[POETICSOFT]' . $texts['subject'],
      $texts['body']
    );
  }
}