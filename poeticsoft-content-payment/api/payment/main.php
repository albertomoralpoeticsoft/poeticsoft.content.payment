<?php
    
require_once(dirname(__FILE__) . '/notify.php');
require_once(dirname(__FILE__) . '/register.php');
require_once(dirname(__FILE__) . '/stripesession.php');
require_once(dirname(__FILE__) . '/stripewebhook.php');
require_once(dirname(__FILE__) . '/init.php');

add_action(
  'rest_api_init',
  function () {

    register_rest_route(
      'poeticsoft/contentpayment',
      'pay/init',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_pay_init',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'poeticsoft/contentpayment',
      'pay/stripe/session/check',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_pay_stripe_session_check',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'poeticsoft/contentpayment',
      'stripe/webhook/events',
      [
        'methods'  => 'POST',
        'callback' => 'poeticsoft_content_payment_stripe_webhook_events',
        'permission_callback' => '__return_true'
      ]
    );
  }
);