<?php

trait PCP_Admin_Fields {  

  public function register_pcp_admin_fields() {    

    add_action( 
      'admin_init',
      function () {

        $plugin_section_prefix = 'pcp_settings_section_';
        $plugin_settings_prefix = 'pcp_settings_';

        foreach(self::$adminfields as $field) {

          if(!isset($field['key'])) { continue; }

          register_setting(
            'poeticsoft', 
            $plugin_settings_prefix . $field['key'],
            [
              'type' => $field['field_type'],
              'default' => $field['value'],
              'label' => $field['title'],
              'description' => $field['description'],
              'sanitize_callback' => function($value) { return $value; },
              'show_in_rest' => true,
              'default' => $field['value']
            ]
          );

          if(isset($field['hidden'])) { continue; }

          add_settings_field(
            $plugin_settings_prefix . $field['key'], 
            '<label for="' . $plugin_settings_prefix . $field['key'] . '">' . 
              __($field['title']) .
            '</label>',
            function () use ($field, $plugin_settings_prefix){

              $value = get_option(
                $plugin_settings_prefix . $field['key'], 
                $field['value']
              );

              $width = isset($field['width']) ? 'style="width: ' . $field['width'] . 'px"' : '';

              if(isset($field['type'])) {

                if('checkbox' == $field['type']) {

                  echo '<input type="checkbox" 
                                id="' . $plugin_settings_prefix . $field['key'] . '" 
                                name="' . $plugin_settings_prefix . $field['key'] . '" 
                                class="regular-text"
                                ' . ($value ? 'checked="chedked"' : '') . ' />';

                }  

                if('number' == $field['type']) {

                  echo '<input type="number" 
                                id="' . $plugin_settings_prefix . $field['key'] . '" 
                                name="' . $plugin_settings_prefix . $field['key'] . '" 
                                class="regular-number"
                                ' . $width . ' 
                                value="' . $value . '" />';

                }  

                if('textarea' == $field['type']) {

                  echo '<textarea
                          id="' . $plugin_settings_prefix . $field['key'] . '" 
                          name="' . $plugin_settings_prefix . $field['key'] . '" 
                          class="regular-text"
                          ' . $width . ' 
                        >' . 
                          $value . 
                        '</textarea>';
                }    

                if('select' == $field['type']) {

                  $options = implode(
                    array_map(
                      function($option) use ($value) {

                        return '<option 
                          value="' . $option['value'] . '"' .
                          ($option['value'] == $value ? ' selected' : '') .
                        '>' . 
                          $option['label'] .
                        '</option>';
                      },
                      $field['options']
                    )
                  );

                  echo '<select
                          id="' . $plugin_settings_prefix . $field['key'] . '" 
                          name="' . $plugin_settings_prefix . $field['key'] . '"
                          ' . $width . ' 
                        >' . 
                          $options . 
                        '</textarea>';
                }   
                
              } else {

                echo '<input type="text" 
                              id="' . $plugin_settings_prefix . $field['key'] . '" 
                              name="' . $plugin_settings_prefix . $field['key'] . '" 
                              class="regular-text"
                              ' . $width . ' 
                              value="' . $value . '" />';
              }
            },
            'poeticsoft',
            $plugin_section_prefix . $field['section']
          );  
        }
      }
    );
  }
}