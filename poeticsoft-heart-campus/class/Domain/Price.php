<?php

namespace Poeticsoft\Heart\Domain;

use Poeticsoft\Heart\Persistence\PostMeta;
use Poeticsoft\Heart\Support\Settings;

class Price
{
    private $settings;
    private $campusTreeService;
    private $postMetaRepository;

    public function __construct(
        Settings $settings,
        Tree $campusTreeService,
        PostMeta $postMetaRepository
    ) {
        $this->settings = $settings;
        $this->campusTreeService = $campusTreeService;
        $this->postMetaRepository = $postMetaRepository;
    }

    public function changePrice($postId, array $params)
    {
        if (!$postId) {
            return $this->updateCampusPrices();
        }

        if (isset($params['type']) && trim((string) $params['type']) !== '') {
            $this->postMetaRepository->setPriceType($postId, $params['type']);
        }

        if (array_key_exists('value', $params) && trim((string) $params['value']) !== '') {
            $this->postMetaRepository->setPriceValue($postId, (float) $params['value']);
        }

        if (array_key_exists('discount', $params) && trim((string) $params['discount']) !== '') {
            $this->postMetaRepository->setPriceDiscount($postId, (float) $params['discount']);
        }

        return $this->updateCampusPrices();
    }

    public function getPrice($postId)
    {
        return $this->postMetaRepository->getPriceData($postId);
    }

    public function updateFreeState($postId, $isFree)
    {
        $type = $isFree ? 'free' : 'paid';
        $updated = $this->postMetaRepository->setPriceType($postId, $type);

        return [
            'postid' => (int) $postId,
            'updated' => $updated ? 'ok' : 'ko',
            'type' => $type,
        ];
    }

    public function getFreeState()
    {
        $campusRootId = $this->campusTreeService->getCampusRootId();
        if (!$campusRootId || !get_post($campusRootId)) {
            throw new \Exception('Campus root page not found', 404);
        }

        $descendants = get_pages(
            [
                'child_of' => $campusRootId,
                'post_type' => get_post_type($campusRootId),
                'post_status' => ['publish', 'pending', 'draft', 'private', 'future'],
            ]
        );

        $ids = wp_list_pluck($descendants, 'ID');
        $ids[] = (int) $campusRootId;

        $statuses = [];
        foreach ($ids as $id) {
            $statuses[$id] = $this->postMetaRepository->getPriceType($id);
        }

        return $statuses;
    }

    public function updateCampusPrices()
    {
        $campusRootId = $this->campusTreeService->getCampusRootId();

        if (!$campusRootId) {
            return [
                'posts' => [],
                'code' => 'error',
                'message' => 'Campus ID not found',
            ];
        }

        if (!get_post($campusRootId)) {
            return [
                'posts' => [],
                'code' => 'error',
                'message' => 'Campus root post not found',
            ];
        }

        $pages = [];
        $this->recurseUpdate($campusRootId, $pages);

        return [
            'posts' => $pages,
            'code' => 'ok',
        ];
    }

    public function recurseUpdate($postId, array &$pages = [])
    {
        $ancestors = get_post_ancestors($postId);
        $type = $this->postMetaRepository->getPriceType($postId);

        if (!$type || trim($type) === '') {
            $type = 'free';
            $this->postMetaRepository->setPriceType($postId, $type);
        }

        $value = (float) $this->postMetaRepository->getPriceValue($postId);
        $discount = (float) $this->postMetaRepository->getPriceDiscount($postId);

        $childIds = get_posts(
            [
                'post_type' => 'page',
                'post_parent' => $postId,
                'posts_per_page' => -1,
                'post_status' => 'publish',
                'fields' => 'ids',
            ]
        );

        $pages[$postId] = [
            'type' => $type,
            'childids' => $childIds,
            'ancestors' => count($ancestors),
        ];

        switch ($type) {
            case 'free':
                $postPrice = 0;
                $pages[$postId]['value'] = $postPrice;
                $this->postMetaRepository->setPriceValue($postId, $postPrice);

                foreach ($childIds as $childId) {
                    $postPrice += $this->recurseUpdate($childId, $pages);
                }
                break;

            case 'local':
                $postPrice = $value;
                $pages[$postId]['value'] = $postPrice;

                foreach ($childIds as $childId) {
                    $postPrice += $this->recurseUpdate($childId, $pages);
                }
                break;

            case 'sum':
                $postPrice = 0;
                foreach ($childIds as $childId) {
                    $postPrice += $this->recurseUpdate($childId, $pages);
                }

                $pages[$postId]['value'] = $postPrice - $discount;
                $this->postMetaRepository->setPriceValue($postId, $postPrice);
                break;

            default:
                $postPrice = 0;
                $pages[$postId]['value'] = $postPrice;
                $this->postMetaRepository->setPriceType($postId, 'free');
                $this->postMetaRepository->setPriceValue($postId, 0);

                foreach ($childIds as $childId) {
                    $postPrice += $this->recurseUpdate($childId, $pages);
                }
                break;
        }

        return $postPrice;
    }
}
