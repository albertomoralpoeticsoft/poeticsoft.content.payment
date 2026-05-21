<?php

namespace Poeticsoft\Heart\Domain;

use Poeticsoft\Heart\Persistence\PostMeta;
use Poeticsoft\Heart\Support\Settings;

class Tree
{
    private $settings;
    private $postMetaRepository;

    public function __construct(Settings $settings, PostMeta $postMetaRepository)
    {
        $this->settings = $settings;
        $this->postMetaRepository = $postMetaRepository;
    }

    public function getCampusRootId()
    {
        return (int) $this->settings->get('campus_root_post_id', 0);
    }

    public function isPostInCampus($postId)
    {
        $campusRootId = $this->getCampusRootId();

        if (!$campusRootId) {
            return false;
        }

        $descendants = get_pages(
            [
                'child_of' => $campusRootId,
                'post_type' => 'page',
                'post_status' => ['publish', 'pending', 'draft', 'future', 'private'],
            ]
        );
        $descendantIds = wp_list_pluck($descendants, 'ID');
        $descendantIds[] = $campusRootId;

        return in_array((int) $postId, array_map('intval', $descendantIds), true);
    }

    public function getCampusPageIdsForAdmin()
    {
        $campusRootId = $this->getCampusRootId();

        if (!$campusRootId) {
            return [];
        }

        $descendants = get_pages(
            [
                'child_of' => $campusRootId,
                'post_type' => 'page',
                'post_status' => ['publish', 'private', 'pending', 'draft', 'future'],
            ]
        );

        $descendantIds = wp_list_pluck($descendants, 'ID');
        $descendantIds[] = $campusRootId;

        return array_map(
            static function ($id) {
                return 'post-' . $id;
            },
            $descendantIds
        );
    }

    public function getCampusPages()
    {
        $campusRootId = $this->getCampusRootId();

        if (!$campusRootId) {
            return [];
        }

        $rootPost = get_post($campusRootId);
        if (!$rootPost) {
            return [];
        }

        $pages = array_merge(
            [$rootPost],
            get_pages(
                [
                    'child_of' => $campusRootId,
                    'post_type' => 'page',
                    'post_status' => 'publish',
                    'sort_column' => 'menu_order',
                ]
            )
        );

        return array_map(
            static function ($page) {
                return [
                    'id' => $page->ID,
                    'title' => $page->post_title,
                    'parent' => $page->post_parent,
                ];
            },
            $pages
        );
    }

    public function getAllCampusPages()
    {
        global $wpdb;

        $campusRootId = $this->getCampusRootId();
        if (!$campusRootId) {
            return [];
        }

        $query = $wpdb->prepare(
            "
            WITH RECURSIVE post_tree AS (
                SELECT ID, post_title, post_status, post_parent
                FROM {$wpdb->posts}
                WHERE ID = %d

                UNION ALL

                SELECT p.ID, p.post_title, p.post_status, p.post_parent
                FROM {$wpdb->posts} p
                INNER JOIN post_tree pt ON p.post_parent = pt.ID
            )
            SELECT ID, post_title, post_status, post_parent
            FROM post_tree
            WHERE post_status NOT IN ('inherit', 'trash')
            ",
            $campusRootId
        );

        return $wpdb->get_results($query);
    }
}
