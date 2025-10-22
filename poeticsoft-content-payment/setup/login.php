<?php

add_action(
  'login_enqueue_scripts', 
  function () {

    $icon_id = get_option('site_icon');
    $icon_url = wp_get_attachment_url($icon_id);

    ?>
    <style type="text/css">

      body.login div#login h1 a {
        background-image: url('<?php echo $icon_url ?>');
        height: 80px;
        width: 80px;
        background-size: contain;
        background-repeat: no-repeat;
        padding-bottom: 10px;
      }

    </style>
    <?php
  }
);

add_action(
  'register_form', 
  function() {
    ?>
    <p>
        <label for="invitecode">
          <?php _e('Código Invitación', 'textdomain') ?>
          <br />
          <input 
            type="text" 
            name="invitecode" 
            id="invitecode" 
            class="input" 
            size="25" 
          />
        </label>
    </p>
    <?php
  }
);