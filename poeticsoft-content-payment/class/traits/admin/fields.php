<?php

trait PCPT_Admin_Fields {  

  public function register_pcpt_admin_fields() {


    $plugin_section_prefix = 'pcpt_settings_section_';
    $plugin_settings_prefix = 'pcpt_settings_';

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
                            value="' . $value . '" />';

            }  

            if('textarea' == $field['type']) {

              echo '<textarea
                      id="' . $plugin_settings_prefix . $field['key'] . '" 
                      name="' . $plugin_settings_prefix . $field['key'] . '" 
                      class="regular-text"
                    >' . 
                      $value . 
                    '</textarea>';
            }   
            
          } else {

            echo '<input type="text" 
                          id="' . $plugin_settings_prefix . $field['key'] . '" 
                          name="' . $plugin_settings_prefix . $field['key'] . '" 
                          class="regular-text"
                          value="' . $value . '" />';
          }
        },
        'poeticsoft',
        $plugin_section_prefix . $field['section']
      );  
    }
  }
}