<?php

if (!class_exists('WP_List_Table')) {
    
  require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class PCPT_Admin_Payments_Table extends WP_List_Table {

    private $data;
    private $per_page = 10;

    public function __construct($data) {

      parent::__construct([
        'singular' => 'payment',
        'plural'   => 'payments',
        'ajax'     => false
      ]);

      $this->data = $data;
    }

    public function get_columns() {

      return [
        'user_mail' => 'User Mail',
        'post_id' => 'Página id',
        'type' => 'Tipo de pago',
        'mode' => 'Modo de pago',
        'price' => 'Precio',
        'creation_date' => 'Fecha creación',
        'confirm_pay_date' => 'Fecha confirmación',
      ];
    }

    public function get_sortable_columns() {
      return [
        'user_mail' => ['user_mail', true],
        'post_id' => ['post_id', false],
        'type' => ['type', true],
        'mode' => ['mode', true],
        'price' => ['price', true],
        'creation_date' => ['creation_date', true],
        'confirm_pay_date' => ['confirm_pay_date', true],
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