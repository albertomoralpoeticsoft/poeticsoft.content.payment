<?php

namespace Poeticsoft\Heart\Blocks;

use Poeticsoft\Heart\Domain\Access;
use Poeticsoft\Heart\Domain\Tree;
use Poeticsoft\Heart\Persistence\PostMeta;
use Poeticsoft\Heart\Support\Environment;
use Poeticsoft\Heart\Support\Request;
use Poeticsoft\Heart\Support\Settings;

class Main
{
    private $environment;
    private $settings;
    private $campusTreeService;
    private $accessService;
    private $requestContext;
    private $postMetaRepository;
    private $registered = false;

    public function __construct(
        Environment $environment,
        Settings $settings,
        Tree $campusTreeService,
        Access $accessService,
        Request $requestContext,
        PostMeta $postMetaRepository
    ) {
        $this->environment = $environment;
        $this->settings = $settings;
        $this->campusTreeService = $campusTreeService;
        $this->accessService = $accessService;
        $this->requestContext = $requestContext;
        $this->postMetaRepository = $postMetaRepository;
    }

    public function register()
    {
        if ($this->registered) {
            return;
        }

        add_filter('block_categories_all', [$this, 'registerBlockCategory'], 10, 2);
        add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueueEditorAssets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueFrontAssets']);
        add_filter('render_block_core/post-content', [$this, 'renderCorePostContent'], 10, 2);

        $this->extendCorePostContentBlock();
        $this->registerBlocks();

        $this->registered = true;
    }

    public function registerBlockCategory($categories)
    {
        return array_merge(
            [
                [
                    'slug' => 'poeticsoft-heart-campus',
                    'title' => __('Poeticsoft Heart Campus', 'poeticsoft-heart-campus'),
                    'icon' => 'superhero',
                ],
            ],
            $categories
        );
    }

    public function enqueueBlockAssets()
    {
        wp_enqueue_style('dashicons');
    }

    public function enqueueEditorAssets()
    {
        if (
            !$this->environment->hasFile('ui/edit/coreconfigs/main.js')
            || !$this->environment->hasFile('ui/edit/coreconfigs/main.css')
        ) {
            return;
        }

        wp_enqueue_script(
            'pcp-coreblocks-configs',
            $this->environment->url('ui/edit/coreconfigs/main.js'),
            ['jquery'],
            filemtime($this->environment->path('ui/edit/coreconfigs/main.js')),
            true
        );

        wp_enqueue_style(
            'pcp-coreblocks-configs',
            $this->environment->url('ui/edit/coreconfigs/main.css'),
            [],
            filemtime($this->environment->path('ui/edit/coreconfigs/main.css'))
        );
    }

    public function enqueueFrontAssets()
    {
        if (
            !$this->environment->hasFile('ui/frontend/postcontent/main.js')
            || !$this->environment->hasFile('ui/frontend/postcontent/main.css')
        ) {
            return;
        }

        wp_enqueue_script(
            'poeticsoft-heart-campus-core-block-postcontent',
            $this->environment->url('ui/frontend/postcontent/main.js'),
            ['jquery'],
            filemtime($this->environment->path('ui/frontend/postcontent/main.js')),
            true
        );

        wp_enqueue_style(
            'poeticsoft-heart-campus-core-block-postcontent',
            $this->environment->url('ui/frontend/postcontent/main.css'),
            [],
            filemtime($this->environment->path('ui/frontend/postcontent/main.css')),
            'all'
        );

        wp_add_inline_script(
            'poeticsoft-heart-campus-core-block-postcontent',
            'var poeticsoft_content_payment_core_block_postcontent_accesstype_origin = ' . wp_json_encode($this->settings->get('campus_access_by', '')) . ';',
            'after'
        );

        global $post;
        if (
            !$post
            || !$this->campusTreeService->isPostInCampus($post->ID)
            || !$this->environment->hasFile('ui/frontend/registeraccess/main.js')
        ) {
            return;
        }

        wp_enqueue_script(
            'poeticsoft-heart-campus-register-access',
            $this->environment->url('ui/frontend/registeraccess/main.js'),
            ['jquery'],
            filemtime($this->environment->path('ui/frontend/registeraccess/main.js')),
            true
        );

        $postId = get_the_ID();
        $validateEmail = $this->accessService->validateEmail();
        $email = $validateEmail ? $validateEmail : 'anonymous';
        $ip = $this->requestContext->getRequestIp();
        $accessData = $postId . '||' . $email . '||' . $ip;

        wp_add_inline_script(
            'poeticsoft-heart-campus-register-access',
            "var poeticsoft_content_payment_register_access_data = '" . esc_js($accessData) . "';",
            'before'
        );
    }

    public function renderCorePostContent($blockContent, $block)
    {
        global $post;

        if (!$post) {
            return '';
        }

        if ($this->accessService->canAccess($post->ID)) {
            return $this->renderAccessMessages($blockContent);
        }

        $attrs = isset($block['attrs']) ? $block['attrs'] : [];

        return $this->renderAccessForm($post->ID, $attrs);
    }

    private function renderAccessMessages($blockContent)
    {
        if (current_user_can('manage_options') && (bool) $this->settings->get('campus_roles_access', false)) {
            return '<div class="ViewAsAdmin">Vista de administrador (<a href="/wp-login.php?action=logout">SALIR</a>)</div>' . $blockContent;
        }

        return $blockContent;
    }

    private function renderAccessForm($postId, array $blockAttrs)
    {
        $showRestrictedText = isset($blockAttrs['showrestrictedtext']) ? $blockAttrs['showrestrictedtext'] : '';
        $postChildIds = get_posts(
            [
                'post_type' => 'page',
                'posts_per_page' => -1,
                'post_parent' => $postId,
                'fields' => 'ids',
            ]
        );

        if (
            $showRestrictedText === 'hiddenalways'
            || ($showRestrictedText === 'onlyincontents' && count($postChildIds))
        ) {
            return '';
        }

        $campusAccessBy = (string) $this->settings->get('campus_access_by', '');
        $duration = $this->settings->get('campus_suscription_duration', 0);
        $currency = $this->settings->get('campus_payment_currency', 'eur');
        $priceMeta = get_post_meta($postId, 'poeticsoft_content_payment_assign_price_value', true);
        $price = is_numeric($priceMeta) ? (float) $priceMeta : 0;

        $restrictedVisibleText = isset($blockAttrs['restrictedvisibletext']) ? $blockAttrs['restrictedvisibletext'] : '';
        $payVisibleText = isset($blockAttrs['payvisibletext']) ? $blockAttrs['payvisibletext'] : '';

        $payVisibleTextInterpolated = strtr(
            $payVisibleText,
            [
                '{price}' => $price,
                '{currency}' => $currency,
                '{suscriptionduration}' => $duration,
            ]
        );

        $restrictedText = $campusAccessBy === 'gsheets'
            ? $restrictedVisibleText
            : $payVisibleTextInterpolated;

        $validUserMail = $this->accessService->validateEmail();
        if ($validUserMail) {
            return '<div class="wp-block-poeticsoft_content_payment_postcontent" data-email="' . esc_attr($validUserMail) . '" data-postid="' . esc_attr($postId) . '"><div class="Forms ShouldPay"><div class="AdviceText">' . $restrictedText . '</div><div class="Dummy">SHOULD PAY</div></div></div>';
        }

        if ((bool) $this->settings->get('campus_use_temporalcode', false)) {
            return '<div class="wp-block-poeticsoft_content_payment_postcontent"><div class="Forms UseTemporalCode"></div></div>';
        }

        return '<div class="wp-block-poeticsoft_content_payment_postcontent"><div class="Forms Identify"></div></div>';
    }

    private function extendCorePostContentBlock()
    {
        $blockType = \WP_Block_Type_Registry::get_instance()->get_registered('core/post-content');
        if (!$blockType) {
            return;
        }

        $blockType->attributes = array_merge(
            $blockType->attributes,
            [
                'showrestrictedtext' => [
                    'type' => 'string',
                    'default' => 'visiblealways',
                ],
                'restrictedvisibletext' => [
                    'type' => 'string',
                    'default' => 'Este contenido esta disponible para suscriptores, solicita el acceso a estos contenidos.',
                ],
                'payvisibletext' => [
                    'type' => 'string',
                    'default' => 'Este contenido esta disponible para suscriptores por un precio de <strong>{price}{currency}, puedes obtener acceso a estos contenidos por un periodo de <strong>{suscriptionduration}</strong> a partir de la fecha de adquisicion.',
                ],
            ]
        );
    }

    private function registerBlocks()
    {
        $blockDir = $this->environment->path('block');
        $blockNames = array_diff(scandir($blockDir), ['..', '.']);

        foreach ($blockNames as $blockName) {
            if (!in_array($blockName, $this->environment->availableBlocks(), true)) {
                continue;
            }

            $blockPath = $blockDir . DIRECTORY_SEPARATOR . $blockName;
            if (!is_dir($blockPath) || !file_exists($blockPath . DIRECTORY_SEPARATOR . 'block.json')) {
                continue;
            }

            register_block_type($blockPath);
        }
    }
}
