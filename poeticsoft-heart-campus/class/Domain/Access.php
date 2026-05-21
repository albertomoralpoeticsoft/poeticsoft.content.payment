<?php

namespace Poeticsoft\Heart\Domain;

use Poeticsoft\Heart\Persistence\Payment;
use Poeticsoft\Heart\Persistence\PostMeta;
use Poeticsoft\Heart\Support\Logger;
use Poeticsoft\Heart\Support\Request;
use Poeticsoft\Heart\Support\Settings;

class Access
{
    private $settings;
    private $campusTreeService;
    private $paymentRepository;
    private $postMetaRepository;
    private $requestContext;
    private $logger;

    public function __construct(
        Settings $settings,
        Tree $campusTreeService,
        Payment $paymentRepository,
        PostMeta $postMetaRepository,
        Request $requestContext,
        Logger $logger
    ) {
        $this->settings = $settings;
        $this->campusTreeService = $campusTreeService;
        $this->paymentRepository = $paymentRepository;
        $this->postMetaRepository = $postMetaRepository;
        $this->requestContext = $requestContext;
        $this->logger = $logger;
    }

    public function registerTemplateHooks()
    {
        add_action('template_redirect', [$this, 'handleTemplateRedirect']);
    }

    public function handleTemplateRedirect()
    {
        global $post;

        if (
            !$post
            || !isset($_GET['action'])
            || $_GET['action'] !== 'logout'
        ) {
            return;
        }

        $this->clearIdentityCookies();

        if (get_current_user_id()) {
            wp_logout();
        }

        $redirectUrl = get_permalink($post->ID);
        if (!$redirectUrl) {
            $redirectUrl = home_url('/');
        }

        wp_safe_redirect($redirectUrl);
        exit;
    }

    public function setIdentityCookies($email, $confirmed)
    {
        setcookie(
            'useremail',
            $email,
            0,
            '/',
            COOKIE_DOMAIN,
            is_ssl(),
            true
        );

        setcookie(
            'codeconfirmed',
            $confirmed ? 'yes' : 'no',
            0,
            '/',
            COOKIE_DOMAIN,
            is_ssl(),
            true
        );
    }

    public function clearIdentityCookies()
    {
        unset($_COOKIE['useremail'], $_COOKIE['usercode'], $_COOKIE['codeconfirmed']);
        setcookie('useremail', '', time() - 3600, '/');
        setcookie('usercode', '', time() - 3600, '/');
        setcookie('codeconfirmed', '', time() - 3600, '/');
    }

    public function loggedUserMail()
    {
        $userId = get_current_user_id();
        if (!$userId) {
            return false;
        }

        $userInfo = get_userdata($userId);
        if (!$userInfo) {
            return false;
        }

        $email = $userInfo->user_email;
        $this->clearIdentityCookies();
        $this->setIdentityCookies($email, false);

        return $email;
    }

    public function validateEmail()
    {
        $loggedUserEmail = $this->loggedUserMail();
        if ($loggedUserEmail) {
            return $loggedUserEmail;
        }

        if (
            isset($_COOKIE['useremail'], $_COOKIE['codeconfirmed'])
            && $_COOKIE['codeconfirmed'] === 'yes'
        ) {
            return sanitize_email($_COOKIE['useremail']);
        }

        return false;
    }

    public function canAccessNotInCampus($postId)
    {
        if (!$postId) {
            return false;
        }

        $campusRootId = $this->campusTreeService->getCampusRootId();
        $ancestors = get_post_ancestors($postId);

        return !in_array((int) $campusRootId, $ancestors, true)
            && (int) $postId !== (int) $campusRootId;
    }

    public function canAccessIsAdmin()
    {
        $currentUser = wp_get_current_user();
        $allowAdmin = (bool) $this->settings->get('campus_roles_access', false);

        return in_array('administrator', (array) $currentUser->roles, true)
            && $allowAdmin;
    }

    public function canAccessIsFree($postId)
    {
        if (!$postId) {
            return false;
        }

        return $this->postMetaRepository->getPriceType($postId) === 'free';
    }

    public function canAccessByPostPaid($postId)
    {
        $validUserMail = $this->validateEmail();
        if (!$validUserMail || !$postId) {
            return false;
        }

        $ancestorIds = get_post_ancestors($postId);
        array_unshift($ancestorIds, (int) $postId);

        $results = $this->paymentRepository->findForEmailAndPosts($validUserMail, $ancestorIds);
        if (empty($results)) {
            return false;
        }

        $resultsByPostIds = [];
        foreach ($results as $result) {
            $resultsByPostIds[$result->post_id] = $result;
        }

        $monthsDuration = (int) $this->settings->get('campus_suscription_duration', 0);
        $currentTimestamp = strtotime(current_time('mysql'));

        foreach ($ancestorIds as $id) {
            if (!isset($resultsByPostIds[$id])) {
                continue;
            }

            $payment = $resultsByPostIds[$id];
            $canAccess = false;

            if ($monthsDuration) {
                if (empty($payment->confirm_pay_date)) {
                    continue;
                }

                $payTimestamp = strtotime($payment->confirm_pay_date);
                $expirationTimestamp = strtotime("+{$monthsDuration} months", $payTimestamp);
                $canAccess = $currentTimestamp >= $payTimestamp && $currentTimestamp <= $expirationTimestamp;
            } else {
                $canAccess = true;
            }

            if (!$canAccess) {
                continue;
            }

            $shouldUpdate = false;
            if (empty($payment->last_access_date)) {
                $shouldUpdate = true;
            } else {
                $lastTime = strtotime($payment->last_access_date);
                $shouldUpdate = ($currentTimestamp - $lastTime) > 3600;
            }

            if ($shouldUpdate) {
                $this->paymentRepository->touchLastAccess($payment->id);
            }

            return true;
        }

        return false;
    }

    public function canAccessChildAccessible($postId)
    {
        global $wpdb;

        $descendants = get_pages(
            [
                'child_of' => $postId,
                'post_type' => 'page',
            ]
        );
        $descendantIds = wp_list_pluck($descendants, 'ID');

        if (empty($descendantIds)) {
            return false;
        }

        $validUserMail = $this->validateEmail();
        if (!$validUserMail) {
            return false;
        }

        $placeholders = implode(',', array_fill(0, count($descendantIds), '%d'));
        $query = $wpdb->prepare(
            "
            SELECT post_id AS id
            FROM {$wpdb->postmeta}
            WHERE meta_key = 'poeticsoft_content_payment_assign_price_type'
            AND meta_value = 'free'
            AND post_id IN ({$placeholders})

            UNION

            SELECT post_id AS id
            FROM {$this->paymentRepository->table()}
            WHERE user_mail = %s
            AND post_id IN ({$placeholders})
            ",
            array_merge($descendantIds, [sanitize_email($validUserMail)], $descendantIds)
        );

        $visibleDescendants = $wpdb->get_results($query);

        return count($visibleDescendants) > 0;
    }

    public function canAccess($postId)
    {
        if ($this->canAccessNotInCampus($postId)) {
            return true;
        }

        if ($this->canAccessIsAdmin()) {
            return true;
        }

        if ($this->canAccessIsFree($postId)) {
            return true;
        }

        if ($this->canAccessByPostPaid($postId)) {
            return true;
        }

        return false;
    }

    public function clearAccessCache($email, $postId = null)
    {
    }

    public function getRequestIp()
    {
        return $this->requestContext->getRequestIp();
    }
}
