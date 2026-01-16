<?php

if (!class_exists('WP_List_Table')) {
    
  require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class PCPT_Admin_Ctas_Table extends WP_List_Table {

    private $data;
    private $per_page = 10;

    public function __construct($data) {

      parent::__construct([
        'singular' => 'cta',
        'plural'   => 'ctas',
        'ajax'     => false
      ]);

      $this->data = $data;
    }

    public function get_columns() {

      return [
        'post_id' => 'Página id',
        'target_id' => 'Página destino',
        'buttontext' => 'Texto del botón',
        'discount' => 'Descuento'
      ];
    }

    public function get_sortable_columns() {

      return [
        'post_id' => ['user_mail', true],
        'target_id' => ['post_id', false],
        'buttontext' => ['type', true],
        'discount' => ['mode', true]
      ];
    }

    public function prepare_items() {

      $columns  = $this->get_columns();
      $hidden   = [];
      $sortable = $this->get_sortable_columns();
      $this->_column_headers = [
        $columns, 
        $hidden, 
        $sortable
      ];

      $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'creation_date';
      $order   = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';
      usort(
        $this->data, 
        function($a, $b) use ($orderby, $order) {

          return ($order === 'asc') ? $a[$orderby] <=> $b[$orderby] : $b[$orderby] <=> $a[$orderby];
        }
      );
      
      $current_page = $this->get_pagenum();
      $total_items  = count($this->data);
      $this->data = array_slice(
        $this->data, 
        ($current_page-1) * $this->per_page, 
        $this->per_page
      );

      $this->set_pagination_args([
        'total_items' => $total_items,
        'per_page' => $this->per_page,
        'total_pages' => ceil($total_items / $this->per_page)
      ]);

      $this->items = $this->data;
    }
    
    public function no_items() {
      echo 'No hay pagos registrados.';
    }
}