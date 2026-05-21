<?php

namespace Poeticsoft\Heart;

use Poeticsoft\Heart\Admin\Main as AdminMain;
use Poeticsoft\Heart\Blocks\Main as BlocksMain;
use Poeticsoft\Heart\Domain\Access;
use Poeticsoft\Heart\Domain\Identification;
use Poeticsoft\Heart\Domain\Payments;
use Poeticsoft\Heart\Domain\Price;
use Poeticsoft\Heart\Domain\Tree;
use Poeticsoft\Heart\Infrastructure\Directus;
use Poeticsoft\Heart\Infrastructure\GoogleSheets;
use Poeticsoft\Heart\Infrastructure\Mail;
use Poeticsoft\Heart\Infrastructure\Mailrelay;
use Poeticsoft\Heart\Persistence\Payment;
use Poeticsoft\Heart\Persistence\PostMeta;
use Poeticsoft\Heart\Rest\Main as RestMain;
use Poeticsoft\Heart\Support\Environment;
use Poeticsoft\Heart\Support\Logger;
use Poeticsoft\Heart\Support\Request;
use Poeticsoft\Heart\Support\Settings;

class Campus
{
    private static $instance;
    private $pluginFile;
    private $services = [];

    public static function instance($pluginFile = null)
    {
        if (self::$instance === null) {
            if ($pluginFile === null) {
                throw new \RuntimeException('Plugin file is required to bootstrap Poeticsoft\\Heart\\Campus.');
            }

            self::$instance = new self($pluginFile);
        }

        return self::$instance;
    }

    private function __construct($pluginFile)
    {
        $this->pluginFile = $pluginFile;
    }

    public function initialize()
    {
        $this->boot();
    }

    public function boot()
    {
        $this->mail()->register();
        $this->access()->registerTemplateHooks();
        $this->admin()->register();
        $this->blocks()->register();
        $this->rest()->register();
    }

    public function activate()
    {
        $this->admin()->activate();
    }

    public function deactivate()
    {
        $this->admin()->deactivate();
    }

    private function environment()
    {
        return $this->service('environment', function () {
            return new Environment($this->pluginFile);
        });
    }

    private function settings()
    {
        return $this->service('settings', function () {
            return new Settings();
        });
    }

    private function logger()
    {
        return $this->service('logger', function () {
            return new Logger($this->environment());
        });
    }

    private function request()
    {
        return $this->service('request', function () {
            return new Request();
        });
    }

    private function postMeta()
    {
        return $this->service('postmeta', function () {
            return new PostMeta();
        });
    }

    private function payment()
    {
        return $this->service('payment', function () {
            return new Payment();
        });
    }

    private function tree()
    {
        return $this->service('tree', function () {
            return new Tree($this->settings(), $this->postMeta());
        });
    }

    private function access()
    {
        return $this->service('access', function () {
            return new Access(
                $this->settings(),
                $this->tree(),
                $this->payment(),
                $this->postMeta(),
                $this->request(),
                $this->logger()
            );
        });
    }

    private function identification()
    {
        return $this->service('identification', function () {
            return new Identification(
                $this->settings(),
                $this->access(),
                $this->mailrelay(),
                $this->payment(),
                $this->logger()
            );
        });
    }

    private function price()
    {
        return $this->service('price', function () {
            return new Price(
                $this->settings(),
                $this->tree(),
                $this->postMeta()
            );
        });
    }

    private function directus()
    {
        return $this->service('directus', function () {
            return new Directus($this->settings(), $this->logger());
        });
    }

    private function googleSheets()
    {
        return $this->service('gsheets', function () {
            return new GoogleSheets($this->environment(), $this->settings());
        });
    }

    private function mailrelay()
    {
        return $this->service('mailrelay', function () {
            return new Mailrelay($this->settings());
        });
    }

    private function mail()
    {
        return $this->service('mail', function () {
            return new Mail($this->settings(), $this->logger());
        });
    }

    private function payments()
    {
        return $this->service('payments', function () {
            return new Payments(
                $this->settings(),
                $this->googleSheets(),
                $this->directus(),
                $this->payment()
            );
        });
    }

    private function admin()
    {
        return $this->service('admin', function () {
            return new AdminMain(
                $this->environment(),
                $this->settings(),
                $this->tree(),
                $this->payments()
            );
        });
    }

    private function blocks()
    {
        return $this->service('blocks', function () {
            return new BlocksMain(
                $this->environment(),
                $this->settings(),
                $this->tree(),
                $this->access(),
                $this->request(),
                $this->postMeta()
            );
        });
    }

    private function rest()
    {
        return $this->service('rest', function () {
            return new RestMain(
                $this->environment(),
                $this->settings(),
                $this->payment(),
                $this->payments(),
                $this->access(),
                $this->identification(),
                $this->price(),
                $this->tree(),
                $this->directus(),
                $this->logger()
            );
        });
    }

    private function service($key, callable $factory)
    {
        if (!array_key_exists($key, $this->services)) {
            $this->services[$key] = $factory();
        }

        return $this->services[$key];
    }
}
