<?php

namespace Poeticsoft\Heart\Persistence;

class Payment
{
    public function table()
    {
        global $wpdb;

        return $wpdb->prefix . 'payment_pays';
    }

    public function all()
    {
        global $wpdb;

        return $wpdb->get_results(
            "SELECT id, user_mail, post_id FROM {$this->table()}",
            ARRAY_A
        );
    }

    public function find($id)
    {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$this->table()} WHERE id = %d",
                (int) $id
            )
        );
    }

    public function findByEmail($email)
    {
        global $wpdb;

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$this->table()} WHERE user_mail = %s",
                sanitize_email($email)
            )
        );
    }

    public function findForEmailAndPosts($email, array $postIds)
    {
        global $wpdb;

        $postIds = array_values(array_filter(array_map('intval', $postIds)));

        if (empty($postIds)) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($postIds), '%d'));
        $query = $wpdb->prepare(
            "SELECT *
             FROM {$this->table()}
             WHERE user_mail = %s
             AND post_id IN ({$placeholders})
             ORDER BY confirm_pay_date DESC",
            array_merge([sanitize_email($email)], $postIds)
        );

        return $wpdb->get_results($query);
    }

    public function insert(array $data)
    {
        global $wpdb;

        $record = $this->sanitizeRecord($data);
        $wpdb->insert($this->table(), $record, $this->formatsFor($record));

        return (int) $wpdb->insert_id;
    }

    public function update($id, array $data)
    {
        global $wpdb;

        $record = $this->sanitizeRecord($data);

        if (empty($record)) {
            return false;
        }

        return (bool) $wpdb->update(
            $this->table(),
            $record,
            ['id' => (int) $id],
            $this->formatsFor($record),
            ['%d']
        );
    }

    public function delete($id)
    {
        global $wpdb;

        return (bool) $wpdb->delete(
            $this->table(),
            ['id' => (int) $id],
            ['%d']
        );
    }

    public function replaceAll(array $rows)
    {
        global $wpdb;

        $wpdb->query('START TRANSACTION');

        $deleteResult = $wpdb->query("DELETE FROM {$this->table()}");
        if ($deleteResult === false) {
            $wpdb->query('ROLLBACK');
            return false;
        }

        foreach ($rows as $row) {
            $this->insert($row);

            if (!empty($wpdb->last_error)) {
                $wpdb->query('ROLLBACK');
                return false;
            }
        }

        $wpdb->query('COMMIT');

        return true;
    }

    public function touchLastAccess($id)
    {
        global $wpdb;

        $wpdb->update(
            $this->table(),
            ['last_access_date' => current_time('mysql')],
            ['id' => (int) $id],
            ['%s'],
            ['%d']
        );
    }

    private function sanitizeRecord(array $data)
    {
        $allowed = [
            'user_mail',
            'post_id',
            'type',
            'mode',
            'price',
            'currency',
            'stripe_session_id',
            'stripe_session_result',
            'creation_date',
            'confirm_pay_date',
            'last_access_date',
        ];

        $record = [];

        foreach ($allowed as $field) {
            if (!array_key_exists($field, $data)) {
                continue;
            }

            $value = $data[$field];

            switch ($field) {
                case 'user_mail':
                    $record[$field] = sanitize_email($value);
                    break;
                case 'post_id':
                    $record[$field] = (int) $value;
                    break;
                case 'price':
                    $record[$field] = (float) $value;
                    break;
                default:
                    $record[$field] = is_scalar($value) || $value === null ? $value : wp_json_encode($value);
                    break;
            }
        }

        return $record;
    }

    private function formatsFor(array $record)
    {
        $formats = [];

        foreach ($record as $field => $value) {
            switch ($field) {
                case 'post_id':
                    $formats[] = '%d';
                    break;
                case 'price':
                    $formats[] = '%f';
                    break;
                default:
                    $formats[] = '%s';
                    break;
            }
        }

        return $formats;
    }
}
