<?php

namespace Poeticsoft\Heart\Support;

class Settings
{
    private $cache = [];

    public function optionName($key)
    {
        return 'pcp_settings_' . $key;
    }

    public function get($key, $default = null)
    {
        $optionName = $this->optionName($key);

        if (!array_key_exists($optionName, $this->cache)) {
            $this->cache[$optionName] = get_option($optionName, $default);
        }

        return $this->cache[$optionName];
    }

    public function sections()
    {
        return [
            [
                'id' => 'stripe',
                'title' => 'Ajustes de conexion con stripe',
                'description' => 'Configuracion y ajustes para la gestion y procesos de pagos stripe.',
            ],
            [
                'id' => 'campus',
                'title' => 'Ajustes del entorno de contenidos del campus',
                'description' => 'Configuracion del campus, contenidos, usuarios y precios.',
            ],
            [
                'id' => 'mailrelay',
                'title' => 'Mailrelay e identificacion',
                'description' => 'Credenciales para autenticacion y registro externo de usuarios.',
            ],
            [
                'id' => 'gclient',
                'title' => 'Google Cloud',
                'description' => 'Archivo de claves e identificadores de documentos.',
            ],
            [
                'id' => 'directus',
                'title' => 'Directus',
                'description' => 'Credenciales y endpoints para Directus.',
            ],
        ];
    }

    public function fields()
    {
        return [
            [
                'key' => 'campus_access_by',
                'field_type' => 'string',
                'title' => 'Origen accesos de alumnos',
                'description' => 'Origen de los accesos del campus.',
                'value' => '',
                'type' => 'select',
                'options' => [
                    ['label' => 'GSheets', 'value' => 'gsheets'],
                    ['label' => 'Mail Relay Suscriptors + Local DB', 'value' => 'mailrelay'],
                    ['label' => 'Directus Access', 'value' => 'directus'],
                ],
                'section' => 'campus',
            ],
            [
                'key' => 'campus_roles_access',
                'field_type' => 'boolean',
                'title' => 'Acceso administradores',
                'description' => 'Permite a administradores ver todo el campus.',
                'value' => false,
                'type' => 'checkbox',
                'section' => 'campus',
            ],
            [
                'key' => 'campus_use_temporalcode',
                'field_type' => 'boolean',
                'title' => 'Usar codigo temporal',
                'description' => 'Permite acceso mediante codigo temporal.',
                'value' => false,
                'type' => 'checkbox',
                'section' => 'campus',
            ],
            [
                'key' => 'campus_temporal_access_mail',
                'field_type' => 'string',
                'title' => 'Mail de acceso temporal',
                'description' => 'Mail asociado al acceso temporal.',
                'value' => '',
                'section' => 'campus',
            ],
            [
                'key' => 'campus_temporal_access_code',
                'field_type' => 'string',
                'title' => 'Codigo de acceso temporal',
                'description' => 'Codigo de acceso temporal.',
                'value' => '',
                'section' => 'campus',
                'width' => 140,
            ],
            [
                'key' => 'campus_root_post_id',
                'field_type' => 'integer',
                'title' => 'Campus Root Post Id',
                'description' => 'Pagina raiz del campus.',
                'value' => 0,
                'type' => 'number',
                'section' => 'campus',
                'width' => 80,
            ],
            [
                'key' => 'campus_page_utils',
                'field_type' => 'boolean',
                'title' => 'Utilidades de paginas',
                'description' => 'Activa utilidades de paginas, precios e interfaces auxiliares.',
                'value' => true,
                'type' => 'checkbox',
                'section' => 'campus',
            ],
            [
                'key' => 'campus_suscription_duration',
                'field_type' => 'integer',
                'title' => 'Suscription Duration (Months)',
                'description' => 'Duracion de la suscripcion en meses. Vacio no aplica.',
                'value' => 12,
                'type' => 'number',
                'section' => 'campus',
                'width' => 80,
            ],
            [
                'key' => 'campus_payment_currency',
                'field_type' => 'string',
                'title' => 'Campus Payment Currency',
                'description' => 'Moneda visible del campus.',
                'value' => 'eur',
                'section' => 'campus',
                'width' => 80,
            ],
            [
                'key' => 'gclient_cred',
                'field_type' => 'string',
                'title' => 'Google Client Credentials File',
                'description' => 'Nombre del archivo de credenciales sin extension.',
                'value' => '',
                'section' => 'gclient',
            ],
            [
                'key' => 'gclient_sheet_alumnos_id',
                'field_type' => 'string',
                'title' => 'Alumnos Sheet id',
                'description' => 'Identificador del documento con la lista de alumnos y posts.',
                'value' => '',
                'section' => 'gclient',
            ],
            [
                'key' => 'gclient_sheet_alumnos_lastmodificationdate',
                'field_type' => 'string',
                'title' => 'Fecha de ultima modificacion de Alumnos Sheet',
                'description' => 'Campo informativo.',
                'value' => '',
                'section' => 'gclient',
                'width' => 160,
            ],
            [
                'key' => 'mailrelay_api_url',
                'field_type' => 'string',
                'title' => 'Mailrelay API URL',
                'description' => 'Base URL de Mailrelay.',
                'value' => '',
                'section' => 'mailrelay',
            ],
            [
                'key' => 'mailrelay_api_key',
                'field_type' => 'string',
                'title' => 'Mailrelay API Key',
                'description' => 'Token de Mailrelay.',
                'value' => '',
                'section' => 'mailrelay',
            ],
            [
                'key' => 'identify_api_url',
                'field_type' => 'string',
                'title' => 'Identify API URL',
                'description' => 'Base URL del servicio externo de registro.',
                'value' => '',
                'section' => 'mailrelay',
            ],
            [
                'key' => 'identify_api_key',
                'field_type' => 'string',
                'title' => 'Identify API Key',
                'description' => 'Token del servicio externo de registro.',
                'value' => '',
                'section' => 'mailrelay',
            ],
            [
                'key' => 'directus_endpoint_sync_access',
                'field_type' => 'string',
                'title' => 'Sincronizacion de Humanos/Paginas',
                'description' => 'Endpoint de sincronizacion de accesos.',
                'value' => '',
                'section' => 'directus',
            ],
            [
                'key' => 'directus_endpoint_sync_access_token',
                'field_type' => 'string',
                'title' => 'Token para sincronizacion de Humanos/Paginas',
                'description' => 'Token de Directus para sincronizar accesos.',
                'value' => '',
                'section' => 'directus',
            ],
            [
                'key' => 'directus_endpoint_log_access',
                'field_type' => 'string',
                'title' => 'Url registro en log de accesos',
                'description' => 'Endpoint de log de accesos en Directus.',
                'value' => '',
                'section' => 'directus',
            ],
            [
                'key' => 'directus_endpoint_log_access_token',
                'field_type' => 'string',
                'title' => 'Token registro en log de accesos',
                'description' => 'Token de Directus para el log de accesos.',
                'value' => '',
                'section' => 'directus',
            ],
        ];
    }
}
