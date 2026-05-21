<?php

namespace Poeticsoft\Heart\Support;

class Logger
{
    private $environment;

    public function __construct(Environment $environment)
    {
        $this->environment = $environment;
    }

    public function log($display, $withDate = false)
    {
        $text = is_string($display)
            ? $display
            : wp_json_encode($display, JSON_PRETTY_PRINT);

        $message = $withDate ? date('d-m-y h:i:s') . PHP_EOL : '';
        $message .= $text . PHP_EOL;

        file_put_contents(
            $this->environment->path('log.txt'),
            $message,
            FILE_APPEND
        );
    }
}
