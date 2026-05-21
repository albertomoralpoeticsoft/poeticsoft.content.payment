<?php

namespace Poeticsoft\Heart\Persistence;

class PostMeta
{
    public function getPriceType($postId)
    {
        $type = get_post_meta(
            (int) $postId,
            'poeticsoft_content_payment_assign_price_type',
            true
        );

        return is_string($type) ? trim($type) : '';
    }

    public function setPriceType($postId, $type)
    {
        return update_post_meta(
            (int) $postId,
            'poeticsoft_content_payment_assign_price_type',
            $type
        );
    }

    public function getPriceValue($postId)
    {
        $value = get_post_meta(
            (int) $postId,
            'poeticsoft_content_payment_assign_price_value',
            true
        );

        return is_numeric($value) ? (float) $value : 0.0;
    }

    public function setPriceValue($postId, $value)
    {
        return update_post_meta(
            (int) $postId,
            'poeticsoft_content_payment_assign_price_value',
            (float) $value
        );
    }

    public function getPriceDiscount($postId)
    {
        $value = get_post_meta(
            (int) $postId,
            'poeticsoft_content_payment_assign_price_discount',
            true
        );

        return is_numeric($value) ? (float) $value : 0.0;
    }

    public function setPriceDiscount($postId, $value)
    {
        return update_post_meta(
            (int) $postId,
            'poeticsoft_content_payment_assign_price_discount',
            (float) $value
        );
    }

    public function getPriceData($postId)
    {
        global $wpdb;

        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT meta_key, meta_value
                 FROM {$wpdb->postmeta}
                 WHERE post_id = %d
                 AND meta_key LIKE %s",
                (int) $postId,
                'poeticsoft_content_payment_assign_price%'
            )
        );

        $price = [];
        foreach ($results as $result) {
            $key = str_replace('poeticsoft_content_payment_assign_price_', '', $result->meta_key);
            $price[$key] = $result->meta_value;
        }

        return $price;
    }
}
