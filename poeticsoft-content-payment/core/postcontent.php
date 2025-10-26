<?php

add_filter( 
  'render_block_core/post-content', 
  function($blockcontent, $block) {

    $userid = 0;
    $postid = 0;

    if(poeticsoft_content_payment_canaccess($userid, $postid)) {
      
      return $blockcontent;

    } else {

      return '<div class="wp-block-poeticsoft_content_payment_postcontent">
        <div class="Explain">
          Este contenido es reservado para suscriptores, 
          por favor, identifícate con tu email para acceder.
        </div>
        <div class="Identify">
          <input
            class="Email"
            type="email"
            placeholder="Tu E-mail"
            name="user-email"
          />
          <div class="wp-block-button">
            <a 
              class="
                EnviarEmail
                wp-block-button__link 
                wp-element-button
              "
            >
              ENVIAR
            </a>
          </div>
        </div>
      </div>';
    }
  },
  10,
  2
);