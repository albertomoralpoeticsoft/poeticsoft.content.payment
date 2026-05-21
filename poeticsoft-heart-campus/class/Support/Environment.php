<?php

namespace Poeticsoft\Heart\Support;

class Environment
{
    private $pluginFile;
    private $pluginDir;
    private $pluginUrl;
    private $slug;

    public function __construct($pluginFile)
    {
        $this->pluginFile = $pluginFile;
        $this->pluginDir = plugin_dir_path($pluginFile);
        $this->pluginUrl = plugin_dir_url($pluginFile);
        $this->slug = 'poeticsoft-heart-campus';
    }

    public function pluginFile()
    {
        return $this->pluginFile;
    }

    public function pluginDir()
    {
        return $this->pluginDir;
    }

    public function pluginUrl()
    {
        return $this->pluginUrl;
    }

    public function pluginBasename()
    {
        return plugin_basename($this->pluginFile);
    }

    public function slug()
    {
        return $this->slug;
    }

    public function path($relative = '')
    {
        return $this->pluginDir . ltrim($relative, '/\\');
    }

    public function url($relative = '')
    {
        return $this->pluginUrl . ltrim($relative, '/\\');
    }

    public function hasFile($relative)
    {
        return file_exists($this->path($relative));
    }

    public function availableBlocks()
    {
        return [
            'breadcrumbs',
            'columntools',
            'containerchildren',
            'mytools',
            'relatedcontent',
            'treenav',
        ];
    }

    public function updateMetadataUrl()
    {
        return 'https://poeticsoft.com/plugins/poeticsoft-heart-campus/poeticsoft-heart-campus.json';
    }
}
