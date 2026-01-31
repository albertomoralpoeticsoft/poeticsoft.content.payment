<?php

trait PCP_Campus_Page { 
  
  public function register_pcp_campus_page() {

    add_post_type_support('page', 'excerpt');
    register_taxonomy_for_object_type('post_tag', 'page');
    
    add_action(
      'wp_insert_post', 
      function($postid, $post, $update) {

        if($post->post_type != 'page') { return; }

        $blocks = parse_blocks($post->post_content);
        $ctacampusblocks = array_map(
          function($block) {

            return $block['attrs'];
            
          },
          array_values(
            array_filter(
              $blocks, 
              function( $block ) {
                  
                return $block['blockName'] === 'poeticsoft/ctacampus';
              }
            )
          )
        );

        $this->campus_page_update_ctacampus(
          $postid,
          $ctacampusblocks
        );
      }, 
      10, 
      3
    );
  }

  public function campus_page_update_ctacampus(
    $postid,
    $blocks
  ) {

    global $wpdb;

    $table = $wpdb->prefix . 'payment_ctas';
    $results = $wpdb->get_results(
      "SELECT * FROM $table WHERE post_id = $postid"
    );

    $blockids = array_map(
      function($block) {

        return $block['blockId'];
      },
      $blocks
    );

    $resultblockids = [];
    foreach($results as $result) {

      $resultblockids[$result->block_id] = $result->id;
    }

    foreach($results as $result) {

      $resultblockid = $result->block_id;
      if(!in_array($resultblockid, $blockids)) {

        $wpdb->delete(
          $table,
          [
            'id' => $result->id
          ],
          [
            '%d'
          ]
        );
      }
    }

    foreach($blocks as $block) {

      if(isset($resultblockids[$block['blockId']])) {

        $resultid = $resultblockids[$block['blockId']];

        $wpdb->update(
          $table,
          [
            'target_id' => $block['targetId'],
            'buttontext' => $block['buttonText'],
            'content' => $block['targetText'],
            'discount' => $block['discount'] ? $block['discount'] : 0
          ],
          [
            'id' => $resultid
          ],
          [  
            '%d',
            '%s', 
            '%s',
            '%d'
          ],
          [ 
            '%d' 
          ]
        );

      } else {

        $wpdb->insert(
          $table,
          [
            'post_id' => $postid,
            'block_id' => $block['blockId'],
            'target_id' => $block['targetId'],
            'buttontext' => $block['buttonText'],
            'content' => $block['targetText'],
            'discount' => $block['discount']
          ],
          [
            '%d',
            '%s', 
            '%d',
            '%s',
            '%s',
            '%d'
          ]
        );
      }
    }
  }
}
