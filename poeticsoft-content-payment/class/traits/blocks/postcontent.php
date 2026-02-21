<?php

trait PCP_Blocks_Postcontent {

  private static $assets_enqueued = false;

  public function register_pcp_blocks_postcontent() {     

    add_action(
      'wp_enqueue_scripts',
      function () {

        wp_enqueue_script(
          'poeticsoft-content-payment-core-block-postcontent',
          self::$url . 'ui/frontend/postcontent/main.js',
          [
            'jquery'
          ],
          filemtime(self::$dir . 'ui/frontend/postcontent/main.js'),
          true
        );

        wp_enqueue_style(
          'poeticsoft-content-payment-core-block-postcontent',
          self::$url . 'ui/frontend/postcontent/main.css',
          [],
          filemtime(self::$dir . 'ui/frontend/postcontent/main.css'),
          'all'
        );

        $accesstype = $this->get_access_by();

        $data_json = json_encode($accesstype);
        $inline_js = "var poeticsoft_content_payment_core_block_postcontent_accesstype_origin = {$data_json};";
        wp_add_inline_script(
          'poeticsoft-content-payment-core-block-postcontent',
          $inline_js,
          'after'
        );
      }
    );

    add_filter(
      'render_block_core/post-content',
      function($blockcontent, $block) { 

        global $post;

        if(!$post) {

          return '';
        }

        if($this->canaccess($post->ID)) {

          return $this->render_access_messages($blockcontent);          
        }    

        return $this->render_access_form(
          $post->ID, 
          $block['attrs']
        );
      },
      10,
      2
    );
  }
  
  private function render_access_messages($blockcontent) {
    
    if ( 
      current_user_can('manage_options')
      &&
      $this->get_allow_admin()
    ) {
      
      return '<div class="ViewAsAdmin">
        Vista de administrador 
        (<a href="/wp-login.php?action=logout">SALIR</a>) 
      </div>' . $blockcontent;        
    }
    
    return $blockcontent;    
  }
  
  private function render_access_form($postid, $blockattrs) {
    
    $showrestrictedtext = isset($blockattrs['showrestrictedtext']) ?
    $blockattrs['showrestrictedtext'] : '';        
    $postchildids = get_posts([
      'post_type' => 'page',
      'posts_per_page' => -1,
      'post_parent' => $postid,
      'fields' => 'ids'
    ]);

    if(
      $showrestrictedtext == 'hiddenalways'
      ||
      (
        $showrestrictedtext == 'onlyincontents'
        &&
        count($postchildids)
      )
    ) {

      return '';
    }

    $campusaccessby = get_option('pcp_settings_campus_access_by');
    $duration = get_option('pcp_settings_campus_suscription_duration');
    $currency = get_option('pcp_settings_campus_payment_currency');
    $price = get_post_meta(
      $postid, 
      'poeticsoft_content_payment_assign_price_value', 
      true
    );
    $restrictedvisibletext = isset($blockattrs['restrictedvisibletext']) ?
    $blockattrs['restrictedvisibletext']
    :
    ''; 
    $payvisibletext = isset($blockattrs['payvisibletext']) ?
    $blockattrs['payvisibletext']
    :
    '';
    $vars = [
      '{price}'              => $price,
      '{currency}'           => $currency,
      '{suscriptionduration}'=> $duration
    ];
    $payvisibletextinterpolated = strtr($payvisibletext, $vars);
    $restrictedtext = '';
    switch($campusaccessby) {

      case 'gsheets':

        $restrictedtext = $restrictedvisibletext;

        break;

      case 'mailrelay':
      default:

        $restrictedtext = $payvisibletextinterpolated;

        break;
    }
        
    if(
      isset($_COOKIE['useremail'])
      &&
      isset($_COOKIE['codeconfirmed'])
      &&
      $_COOKIE['codeconfirmed'] == 'yes'
    ) { 
        
        $useremail = $_COOKIE['useremail'];

      return '<div
        class="wp-block-poeticsoft_content_payment_postcontent"
        data-email="' . esc_attr($useremail) . '"
        data-postid="' . esc_attr($postid) . '"
      >
        <div class="Forms ShouldPay">
          <div class="AdviceText">' . 
            $restrictedtext . 
          '</div>
          <div class="Dummy">SHOULD PAY</div>
        </div>
      </div>';

    } else {

      if($this->get_use_temporal_code()) {

        return '<div class="wp-block-poeticsoft_content_payment_postcontent">
          <div class="Forms UseTemporalCode"></div>
        </div>';

      } else {

        return '<div class="wp-block-poeticsoft_content_payment_postcontent">
          <div class="Forms Identify"></div>
        </div>';
      }
    }
  }
}
