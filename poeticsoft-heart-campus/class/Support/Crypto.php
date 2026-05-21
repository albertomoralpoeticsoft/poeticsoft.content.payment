<?php

namespace Poeticsoft\Heart\Support;

class Crypto
{
    private $method;
    private $key;

    public function __construct()
    {
        $this->method = 'aes-256-cbc';
        $this->key = hash('sha256', wp_salt('auth'));
    }

    public function encrypt($content)
    {
        $iv = openssl_random_pseudo_bytes(
            openssl_cipher_iv_length($this->method)
        );

        $encrypted = openssl_encrypt(
            $content,
            $this->method,
            $this->key,
            0,
            $iv
        );

        return base64_encode($encrypted . '::' . $iv);
    }

    public function decrypt($encryptedContent)
    {
        $decoded = base64_decode($encryptedContent);

        if ($decoded === false || strpos($decoded, '::') === false) {
            return false;
        }

        list($content, $iv) = explode('::', $decoded, 2);

        return openssl_decrypt(
            $content,
            $this->method,
            $this->key,
            0,
            $iv
        );
    }
}
