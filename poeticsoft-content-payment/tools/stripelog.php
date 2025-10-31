<?php

function stripe_log($display) { 

  $text = is_string($display) ? 
  $display 
  : 
  json_encode($display, JSON_PRETTY_PRINT);

  file_put_contents(
    __DIR__ . '/stripe.txt',
    '------------------------------------------------------' . PHP_EOL .
    date('H:i:s') . PHP_EOL .
    $text . PHP_EOL,
    FILE_APPEND
  );
}