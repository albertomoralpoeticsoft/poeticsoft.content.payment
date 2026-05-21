<?php

namespace Poeticsoft\Heart\Admin;

use Poeticsoft\Heart\Domain\Payments;
use Poeticsoft\Heart\Domain\Tree;
use Poeticsoft\Heart\Support\Environment;
use Poeticsoft\Heart\Support\Settings;

class Main
{
    private $environment;
    private $settings;
    private $campusTreeService;
    private $paymentsSyncService;
    private $registered = false;

    public function __construct(
        Environment $environment,
        Settings $settings,
        Tree $campusTreeService,
        Payments $paymentsSyncService
    ) {
        $this->environment = $environment;
        $this->settings = $settings;
        $this->campusTreeService = $campusTreeService;
        $this->paymentsSyncService = $paymentsSyncService;
    }

    public function register()
    {
        if ($this->registered) {
            return;
        }

        add_action('admin_init', [$this, 'registerSettings']);
        add_action('admin_menu', [$this, 'registerMenu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAssets']);
        add_action('add_meta_boxes', [$this, 'registerMetaBoxes'], 10, 2);
        add_action('wp_insert_post', [$this, 'handleInsertPost'], 10, 3);
        add_action('pcp_cron_fifteen_minutes', [$this, 'handleCron']);
        add_filter('cron_schedules', [$this, 'registerCronSchedules']);

        $this->registered = true;
    }

    public function activate()
    {
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        global $wpdb;

        $charsetCollate = $wpdb->get_charset_collate();

        dbDelta(
            "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}payment_pays (
                id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
                user_mail VARCHAR(255) NOT NULL,
                post_id BIGINT(20) UNSIGNED NOT NULL,
                type VARCHAR(10),
                mode VARCHAR(50) DEFAULT 'payment',
                price DECIMAL(10,2) DEFAULT 0,
                currency VARCHAR(10) DEFAULT 'eur',
                stripe_session_id VARCHAR(256),
                stripe_session_result VARCHAR(256),
                creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                confirm_pay_date DATETIME DEFAULT NULL,
                last_access_date DATETIME DEFAULT NULL,
                PRIMARY KEY (id),
                KEY post_id (post_id),
                KEY user_mail (user_mail)
            ) {$charsetCollate};"
        );

        dbDelta(
            "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}campus_calendar_groups (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                color VARCHAR(255)
            ) {$charsetCollate};"
        );

        dbDelta(
            "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}campus_calendar_events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                eventsgroup BIGINT(20) UNSIGNED,
                title VARCHAR(255) NOT NULL,
                start DATETIME NOT NULL,
                end DATETIME DEFAULT NULL,
                allDay TINYINT(1) DEFAULT 0,
                rrule TEXT DEFAULT NULL,
                exdate TEXT DEFAULT NULL,
                postid BIGINT(20) UNSIGNED
            ) {$charsetCollate};"
        );

        if (!wp_next_scheduled('pcp_cron_fifteen_minutes')) {
            wp_schedule_event(time(), 'fifteen_minutes', 'pcp_cron_fifteen_minutes');
        }
    }

    public function deactivate()
    {
        wp_clear_scheduled_hook('pcp_cron_fifteen_minutes');
    }

    public function registerCronSchedules($schedules)
    {
        $schedules['fifteen_minutes'] = [
            'interval' => 900,
            'display' => __('Cada 15 minutos', 'poeticsoft-heart-campus'),
        ];

        return $schedules;
    }

    public function handleCron()
    {
        $this->paymentsSyncService->sync();
    }

    public function registerSettings()
    {
        foreach ($this->settings->sections() as $section) {
            add_settings_section(
                'pcp_settings_section_' . $section['id'],
                $section['title'],
                static function () use ($section) {
                    echo '<p>' . esc_html($section['description']) . '</p>';
                },
                'poeticsoft'
            );
        }

        foreach ($this->settings->fields() as $field) {
            register_setting(
                'poeticsoft',
                $this->settings->optionName($field['key']),
                [
                    'type' => $field['field_type'],
                    'default' => $field['value'],
                    'label' => $field['title'],
                    'description' => $field['description'],
                    'sanitize_callback' => function ($value) use ($field) {
                        return $this->sanitizeFieldValue($field, $value);
                    },
                    'show_in_rest' => true,
                ]
            );

            if (isset($field['hidden']) && $field['hidden']) {
                continue;
            }

            add_settings_field(
                $this->settings->optionName($field['key']),
                '<label for="' . esc_attr($this->settings->optionName($field['key'])) . '">' . esc_html($field['title']) . '</label>',
                function () use ($field) {
                    $this->renderField($field);
                },
                'poeticsoft',
                'pcp_settings_section_' . $field['section']
            );
        }
    }

    public function registerMenu()
    {
        add_menu_page(
            'Poeticsoft Heart Campus',
            'Poeticsoft',
            'manage_options',
            'poeticsoft',
            [$this, 'renderSettingsPage'],
            'dashicons-welcome-learn-more',
            58
        );

        add_submenu_page(
            'poeticsoft',
            'Ajustes',
            'Ajustes',
            'manage_options',
            'poeticsoft',
            [$this, 'renderSettingsPage']
        );

        add_submenu_page(
            'poeticsoft',
            'Accesos',
            'Accesos',
            'manage_options',
            'pcp_payments',
            [$this, 'renderPaymentsPage']
        );
    }

    public function enqueueAssets()
    {
        $screen = function_exists('get_current_screen') ? get_current_screen() : null;
        $pageUtilsActive = (bool) $this->settings->get('campus_page_utils', true);

        if ($screen && $screen->id === 'poeticsoft_page_pcp_payments') {
            wp_enqueue_script(
                'poeticsoft-heart-campus-admin-payments',
                $this->environment->url('ui/admin/payments/main.js'),
                ['wp-blocks', 'wp-block-editor', 'wp-element', 'wp-components', 'wp-data', 'wp-hooks', 'lodash'],
                filemtime($this->environment->path('ui/admin/payments/main.js')),
                true
            );

            wp_enqueue_style(
                'poeticsoft-heart-campus-admin-payments',
                $this->environment->url('ui/admin/payments/main.css'),
                [],
                filemtime($this->environment->path('ui/admin/payments/main.css')),
                'all'
            );

            wp_add_inline_script(
                'poeticsoft-heart-campus-admin-payments',
                'var poeticsoft_content_payment_admin_accesstype_origin = ' . wp_json_encode($this->settings->get('campus_access_by', '')) . ';',
                'after'
            );
        }

        if (
            $pageUtilsActive
            && $screen
            && in_array($screen->id, ['edit-page', 'toplevel_page_nestedpages'], true)
            && $this->environment->hasFile('ui/admin/pageslist/main.js')
            && $this->environment->hasFile('ui/admin/pageslist/main.css')
        ) {
            wp_enqueue_script(
                'poeticsoft-heart-campus-admin-pageslist',
                $this->environment->url('ui/admin/pageslist/main.js'),
                ['jquery'],
                filemtime($this->environment->path('ui/admin/pageslist/main.js')),
                true
            );

            wp_enqueue_style(
                'poeticsoft-heart-campus-admin-pageslist',
                $this->environment->url('ui/admin/pageslist/main.css'),
                ['wp-block-library', 'wp-block-library-theme'],
                filemtime($this->environment->path('ui/admin/pageslist/main.css')),
                'all'
            );

            $pages = get_posts(
                [
                    'post_type' => 'page',
                    'post_status' => 'any',
                    'fields' => 'ids',
                    'posts_per_page' => -1,
                ]
            );

            $pageIds = [];
            foreach ($pages as $pageId) {
                $children = get_children(
                    [
                        'post_parent' => $pageId,
                        'post_type' => 'page',
                        'fields' => 'ids',
                    ]
                );

                $pageIds['post-' . $pageId] = array_map(
                    static function ($child) {
                        return 'post-' . $child;
                    },
                    $children
                );
            }

            wp_add_inline_script(
                'poeticsoft-heart-campus-admin-pageslist',
                'var poeticsoft_content_payment_admin_pageslist = ' . wp_json_encode($pageIds) . ';',
                'after'
            );
        }
    }

    public function registerMetaBoxes($postType, $post)
    {
        if (
            $postType !== 'page'
            || !(bool) $this->settings->get('campus_page_utils', true)
            || !$this->campusTreeService->isPostInCampus($post->ID)
        ) {
            return;
        }

        add_meta_box(
            'pcp_page_assign_price',
            'Acceso',
            static function ($post) {
                echo '<div class="pricewrapper" data-id="post-' . esc_attr($post->ID) . '"></div>';
            },
            'page',
            'side',
            'default'
        );
    }

    public function handleInsertPost($postId, $post, $update)
    {
        if (wp_is_post_revision($postId) || !$post || $post->post_type !== 'page') {
            return;
        }

        if (!$update && get_post_meta($postId, 'poeticsoft_content_payment_assign_price_type', true) === '') {
            update_post_meta($postId, 'poeticsoft_content_payment_assign_price_type', 'free');
        }
    }

    public function renderSettingsPage()
    {
        echo '<div class="wrap">';
        echo '<h1>Poeticsoft Heart Campus</h1>';
        echo '<form method="post" action="options.php">';
        settings_fields('poeticsoft');
        do_settings_sections('poeticsoft');
        submit_button();
        echo '</form>';
        echo '</div>';
    }

    public function renderPaymentsPage()
    {
        echo '<div id="pcp_admin_payments" class="wrap"><h1>Accesos</h1><div id="PaymentsAPP"></div></div>';
    }

    private function renderField(array $field)
    {
        $optionName = $this->settings->optionName($field['key']);
        $defaultValue = isset($field['value']) ? $field['value'] : '';
        $value = get_option($optionName, $defaultValue);
        $width = isset($field['width']) ? ' style="width: ' . (int) $field['width'] . 'px"' : '';

        if (isset($field['type']) && $field['type'] === 'checkbox') {
            $value = (bool) $value;
            echo '<input type="checkbox" id="' . esc_attr($optionName) . '" name="' . esc_attr($optionName) . '" class="regular-text" value="1" ' . checked((bool) $value, true, false) . ' />';
            return;
        }

        if (isset($field['type']) && $field['type'] === 'number') {
            $value = is_numeric($value) ? $value : $defaultValue;
            echo '<input type="number" id="' . esc_attr($optionName) . '" name="' . esc_attr($optionName) . '" class="regular-number"' . $width . ' value="' . esc_attr($value) . '" />';
            return;
        }

        $value = is_scalar($value) ? (string) $value : (string) $defaultValue;

        if (isset($field['type']) && $field['type'] === 'textarea') {
            echo '<textarea id="' . esc_attr($optionName) . '" name="' . esc_attr($optionName) . '" class="regular-text"' . $width . '>' . esc_textarea($value) . '</textarea>';
            return;
        }

        if (isset($field['type']) && $field['type'] === 'select') {
            echo '<select id="' . esc_attr($optionName) . '" name="' . esc_attr($optionName) . '"' . $width . '>';
            foreach ($field['options'] as $option) {
                echo '<option value="' . esc_attr($option['value']) . '"' . selected($option['value'], $value, false) . '>' . esc_html($option['label']) . '</option>';
            }
            echo '</select>';
            return;
        }

        echo '<input type="text" id="' . esc_attr($optionName) . '" name="' . esc_attr($optionName) . '" class="regular-text"' . $width . ' value="' . esc_attr($value) . '" />';
    }

    private function sanitizeFieldValue(array $field, $value)
    {
        $type = isset($field['type']) ? $field['type'] : 'text';

        switch ($type) {
            case 'checkbox':
                return (bool) $value;
            case 'number':
                return is_numeric($value) ? (int) $value : 0;
            case 'textarea':
                return wp_kses_post($value);
            case 'select':
                return sanitize_text_field($value);
            default:
                return sanitize_text_field($value);
        }
    }
}
