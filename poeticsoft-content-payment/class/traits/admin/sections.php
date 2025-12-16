<?php

trait PCPT_Admin_Sections {  

  public function register_pcpt_admin_sections() { 

    self::$adminsections[] = [
      'id' => 'stripe', 
      'title' => 'Ajustes de conexión con stripe',
      'callback' => function() {        
        echo '<p>Configuracion y ajustes para la gestión y procesos de pagos stripe.</p>';
      }
    ];

    self::$adminsections[] = [
      'id' => 'campus', 
      'title' => 'Ajustes del entorno de contenidos del campus',
      'callback' => function() {        
        echo '<p>Configuracion y ajustes de elementos que organizan el campus, contenidos, usuarios, precios etc.</p>';
      }
    ];

    self::$adminsections[] = [
      'id' => 'mailrelay', 
      'title' => 'Claves para comunicar con el servicio de autenticacion de usuarios por Mailrelay',
      'callback' => function() {        
        echo '<p>Configuracion y ajustes de elementos que organizan el campus, contenidos, usuarios, precios etc.</p>';
      }
    ];

    foreach(self::$adminsections as $section) {

      add_settings_section(
        'pcpt_settings_section_' . $section['id'], 
        $section['title'],
        $section['callback'],
        'poeticsoft'
      );
    }
  }
}