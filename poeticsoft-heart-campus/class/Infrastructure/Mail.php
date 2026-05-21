<?php

namespace Poeticsoft\Heart\Infrastructure;

use Poeticsoft\Heart\Support\Logger;
use Poeticsoft\Heart\Support\Settings;

class Mail
{
    private $settings;
    private $logger;
    private $registered = false;

    public function __construct(Settings $settings, Logger $logger)
    {
        $this->settings = $settings;
        $this->logger = $logger;
    }

    public function register()
    {
        if ($this->registered) {
            return;
        }

        add_action('phpmailer_init', [$this, 'configureMailer']);
        add_action('wp_mail_failed', [$this, 'handleMailFailure'], 10, 1);

        $this->registered = true;
    }

    public function configureMailer($phpmailer)
    {
        $useExternalSmtp = (bool) get_option('pb_settings_external_smtp', false);

        if (!$useExternalSmtp) {
            return;
        }

        $mailHost = (string) get_option('pb_settings_mail_host', '');
        $mailPort = (int) get_option('pb_settings_mail_port', 0);
        $mailSmtpSecure = (string) get_option('pb_settings_mail_smtpsecure', '');
        $mailUsername = (string) get_option('pb_settings_mail_username', '');
        $mailPassword = (string) get_option('pb_settings_mail_password', '');
        $mailFrom = (string) get_option('pb_settings_mail_from', '');
        $mailFromName = (string) get_option('pb_settings_mail_fromname', '');

        if ($mailHost === '' || $mailPort <= 0 || $mailUsername === '' || $mailFrom === '') {
            return;
        }

        $phpmailer->isSMTP();
        $phpmailer->SMTPAuth = true;
        $phpmailer->SMTPSecure = $mailSmtpSecure;
        $phpmailer->Port = $mailPort;
        $phpmailer->Host = $mailHost;
        $phpmailer->Username = $mailUsername;
        $phpmailer->Password = $mailPassword;
        $phpmailer->From = $mailFrom;
        $phpmailer->FromName = $mailFromName;
        $phpmailer->isHTML(true);
    }

    public function handleMailFailure($wpError)
    {
        $this->logger->log(
            [
                'event' => 'wp_mail_failed',
                'message' => $wpError instanceof \WP_Error ? $wpError->get_error_message() : 'unknown',
            ],
            true
        );
    }
}
