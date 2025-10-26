<?php

add_action(
  'init', 
  function() {

    $plugincoredir = WP_PLUGIN_DIR . '/poeticsoft-content-payment/core/';
    $coredir = __DIR__;
    $corefiles = array_diff(
      scandir($coredir),
      ['main.php', '..', '.']
    );
    
    foreach($corefiles as $key => $corefile) {  

      require_once($plugincoredir . $corefile);
    }
  }
);