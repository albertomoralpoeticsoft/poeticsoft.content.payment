<?php

namespace Poeticsoft\Heart\Rest;

use Poeticsoft\Heart\Domain\Access;
use Poeticsoft\Heart\Domain\Identification;
use Poeticsoft\Heart\Domain\Payments;
use Poeticsoft\Heart\Domain\Price;
use Poeticsoft\Heart\Domain\Tree;
use Poeticsoft\Heart\Infrastructure\Directus;
use Poeticsoft\Heart\Persistence\Payment;
use Poeticsoft\Heart\Support\Environment;
use Poeticsoft\Heart\Support\Logger;
use Poeticsoft\Heart\Support\Settings;

class Main
{
    private $environment;
    private $settings;
    private $paymentRepository;
    private $paymentsSyncService;
    private $accessService;
    private $identificationService;
    private $priceService;
    private $campusTreeService;
    private $directusClient;
    private $logger;
    private $registered = false;

    public function __construct(
        Environment $environment,
        Settings $settings,
        Payment $paymentRepository,
        Payments $paymentsSyncService,
        Access $accessService,
        Identification $identificationService,
        Price $priceService,
        Tree $campusTreeService,
        Directus $directusClient,
        Logger $logger
    ) {
        $this->environment = $environment;
        $this->settings = $settings;
        $this->paymentRepository = $paymentRepository;
        $this->paymentsSyncService = $paymentsSyncService;
        $this->accessService = $accessService;
        $this->identificationService = $identificationService;
        $this->priceService = $priceService;
        $this->campusTreeService = $campusTreeService;
        $this->directusClient = $directusClient;
        $this->logger = $logger;
    }

    public function register()
    {
        if ($this->registered) {
            return;
        }

        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminApiNonce']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueFrontApiNonce']);
        add_action('rest_api_init', [$this, 'registerRoutes']);

        $this->registered = true;
    }

    public function enqueueAdminApiNonce()
    {
        wp_register_script('poeticsoft-heart-campus-api-admin', false, [], null, true);
        wp_enqueue_script('poeticsoft-heart-campus-api-admin');

        wp_add_inline_script(
            'poeticsoft-heart-campus-api-admin',
            'var poeticsoft_content_payment_api = ' . wp_json_encode(['nonce' => wp_create_nonce('wp_rest')]) . ';',
            'after'
        );

        $campusIds = $this->campusTreeService->getCampusPageIdsForAdmin();
        wp_add_inline_script(
            'poeticsoft-heart-campus-api-admin',
            'var poeticsoft_content_payment_admin_campus_ids = ' . wp_json_encode($campusIds) . ';',
            'after'
        );
    }

    public function enqueueFrontApiNonce()
    {
        wp_register_script('poeticsoft-heart-campus-api-front', false, [], null, true);
        wp_enqueue_script('poeticsoft-heart-campus-api-front');

        wp_add_inline_script(
            'poeticsoft-heart-campus-api-front',
            'var poeticsoft_content_payment_api = ' . wp_json_encode(['nonce' => wp_create_nonce('wp_rest')]) . ';',
            'after'
        );
    }

    public function registerRoutes()
    {
        register_rest_route(
            'poeticsoft/contentpayment',
            'maintenance/test',
            [
                'methods' => 'GET',
                'callback' => [$this, 'maintenanceTest'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'maintenance/updatepayments',
            [
                'methods' => 'GET',
                'callback' => [$this, 'maintenanceUpdatePayments'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'mail/sendtest',
            [
                'methods' => 'GET',
                'callback' => [$this, 'sendMailTest'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/pages',
            [
                'methods' => 'GET',
                'callback' => [$this, 'campusPages'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/all-pages',
            [
                'methods' => 'GET',
                'callback' => [$this, 'campusAllPages'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/access',
            [
                'methods' => 'POST',
                'callback' => [$this, 'campusAccess'],
                'permission_callback' => '__return_true',
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/payments/get',
            [
                'methods' => 'GET',
                'callback' => [$this, 'campusPaymentsGet'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/payments/create',
            [
                'methods' => 'POST',
                'callback' => [$this, 'campusPaymentsCreate'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/payments/update',
            [
                'methods' => 'POST',
                'callback' => [$this, 'campusPaymentsUpdate'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/payments/delete',
            [
                'methods' => 'POST',
                'callback' => [$this, 'campusPaymentsDelete'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'campus/payments/refresh',
            [
                'methods' => 'GET',
                'callback' => [$this, 'campusPaymentsRefresh'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'price/changeprice',
            [
                'methods' => 'POST',
                'callback' => [$this, 'priceChange'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'price/getprice',
            [
                'methods' => 'GET',
                'callback' => [$this, 'priceGet'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'state/updatefree',
            [
                'methods' => 'POST',
                'callback' => [$this, 'stateUpdateFree'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'state/getfree',
            [
                'methods' => 'GET',
                'callback' => [$this, 'stateGetFree'],
                'permission_callback' => [$this, 'adminPermission'],
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'identify/subscriber/register',
            [
                'methods' => 'POST',
                'callback' => [$this, 'identifyRegister'],
                'permission_callback' => '__return_true',
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'identify/subscriber/identify',
            [
                'methods' => 'POST',
                'callback' => [$this, 'identifySubscriber'],
                'permission_callback' => '__return_true',
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'identify/subscriber/checktemporalcode',
            [
                'methods' => 'POST',
                'callback' => [$this, 'identifyCheckTemporalCode'],
                'permission_callback' => '__return_true',
            ]
        );

        register_rest_route(
            'poeticsoft/contentpayment',
            'identify/subscriber/confirmcode',
            [
                'methods' => 'POST',
                'callback' => [$this, 'identifyConfirmCode'],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function adminPermission()
    {
        return current_user_can('manage_options');
    }

    public function maintenanceTest()
    {
        return new \WP_REST_Response('test');
    }

    public function maintenanceUpdatePayments()
    {
        return new \WP_REST_Response($this->paymentsSyncService->sync());
    }

    public function sendMailTest()
    {
        $adminEmail = sanitize_email((string) get_option('admin_email', ''));
        if ($adminEmail === '') {
            return new \WP_REST_Response(
                [
                    'response' => [
                        'Intento de envio de mail',
                        'admin_email not configured',
                    ],
                ]
            );
        }

        $sent = wp_mail(
            $adminEmail,
            'Poeticsoft Heart Campus test',
            'Body'
        );

        return new \WP_REST_Response(
            [
                'response' => [
                    'Intento de envio de mail',
                    $sent ? 'sent' : 'not sent',
                ],
            ]
        );
    }

    public function campusPages()
    {
        return new \WP_REST_Response(
            [
                'result' => 'ok',
                'data' => $this->campusTreeService->getCampusPages(),
            ]
        );
    }

    public function campusAllPages()
    {
        return new \WP_REST_Response($this->campusTreeService->getAllCampusPages());
    }

    public function campusAccess(\WP_REST_Request $request)
    {
        return new \WP_REST_Response($this->directusClient->logAccess($request->get_params()));
    }

    public function campusPaymentsGet()
    {
        return new \WP_REST_Response(
            [
                'result' => 'ok',
                'data' => $this->paymentRepository->all(),
            ]
        );
    }

    public function campusPaymentsCreate(\WP_REST_Request $request)
    {
        $event = $request->get_params();
        $id = $this->paymentRepository->insert($event);

        if (isset($event['user_mail'], $event['post_id'])) {
            $this->accessService->clearAccessCache($event['user_mail'], $event['post_id']);
        }

        return new \WP_REST_Response(['result' => 'ok', 'data' => $id]);
    }

    public function campusPaymentsUpdate(\WP_REST_Request $request)
    {
        $params = $request->get_params();
        $id = isset($params['id']) ? (int) $params['id'] : 0;
        unset($params['id']);

        $existing = $this->paymentRepository->find($id);
        $this->paymentRepository->update($id, $params);

        if ($existing) {
            $email = isset($params['user_mail']) ? $params['user_mail'] : $existing->user_mail;
            $postId = isset($params['post_id']) ? $params['post_id'] : $existing->post_id;
            $this->accessService->clearAccessCache($email, $postId);

            if (isset($params['user_mail']) && $params['user_mail'] !== $existing->user_mail) {
                $this->accessService->clearAccessCache($existing->user_mail, $existing->post_id);
            }

            if (isset($params['post_id']) && (int) $params['post_id'] !== (int) $existing->post_id) {
                $this->accessService->clearAccessCache($existing->user_mail, $existing->post_id);
            }
        }

        return new \WP_REST_Response(['result' => 'ok', 'data' => $id]);
    }

    public function campusPaymentsDelete(\WP_REST_Request $request)
    {
        $id = (int) $request->get_param('id');
        $existing = $this->paymentRepository->find($id);
        $this->paymentRepository->delete($id);

        if ($existing) {
            $this->accessService->clearAccessCache($existing->user_mail, $existing->post_id);
        }

        return new \WP_REST_Response(['result' => 'ok', 'data' => $id]);
    }

    public function campusPaymentsRefresh()
    {
        return new \WP_REST_Response(
            [
                'result' => 'ok',
                'data' => $this->paymentsSyncService->sync(),
            ]
        );
    }

    public function priceChange(\WP_REST_Request $request)
    {
        $postId = (int) $request->get_param('postid');

        return new \WP_REST_Response(
            $this->priceService->changePrice(
                $postId,
                [
                    'type' => $request->get_param('type'),
                    'value' => $request->get_param('value'),
                    'discount' => $request->get_param('discount'),
                ]
            )
        );
    }

    public function priceGet(\WP_REST_Request $request)
    {
        $postId = (int) $request->get_param('postid');

        if (!$postId) {
            return new \WP_REST_Response('Post id not provided', 404);
        }

        if (!get_post($postId)) {
            return new \WP_REST_Response('Post not found', 404);
        }

        return new \WP_REST_Response($this->priceService->getPrice($postId));
    }

    public function stateUpdateFree(\WP_REST_Request $request)
    {
        $postId = (int) $request->get_param('postid');
        $isFree = (bool) $request->get_param('isfree');

        if (!$postId) {
            return new \WP_REST_Response('Post id not provided', 404);
        }

        if (!get_post($postId)) {
            return new \WP_REST_Response('Post not found', 404);
        }

        return new \WP_REST_Response($this->priceService->updateFreeState($postId, $isFree));
    }

    public function stateGetFree()
    {
        try {
            return new \WP_REST_Response($this->priceService->getFreeState());
        } catch (\Exception $exception) {
            return new \WP_REST_Response($exception->getMessage(), $exception->getCode() ?: 500);
        }
    }

    public function identifyRegister(\WP_REST_Request $request)
    {
        return new \WP_REST_Response(
            $this->identificationService->registerSubscriber($request->get_param('email'))
        );
    }

    public function identifySubscriber(\WP_REST_Request $request)
    {
        return new \WP_REST_Response(
            $this->identificationService->identifySubscriber($request->get_param('email'))
        );
    }

    public function identifyCheckTemporalCode(\WP_REST_Request $request)
    {
        return new \WP_REST_Response(
            $this->identificationService->checkTemporalCode($request->get_param('code'))
        );
    }

    public function identifyConfirmCode(\WP_REST_Request $request)
    {
        return new \WP_REST_Response(
            $this->identificationService->confirmCode(
                $request->get_param('email'),
                $request->get_param('code')
            )
        );
    }
}
