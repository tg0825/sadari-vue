<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_result extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 당첨 횟수 기준 결과
     */
    public function get_ranking_ordered($filter)
    {
        $this->load->database();
        
        $game_type = $filter['game_type'];
        $filter_type = $filter['filter_type'];
        
        $order_type = ($filter_type == 2) ? 'DESC' : 'ASC';

        $query = $this->db->query('
            SELECT m.name, count(user_id)
            FROM game_result AS r
            JOIN member AS m
            ON r.user_id = m.id
            WHERE game_type = ' . $game_type . '
            GROUP BY user_id
            ORDER BY count(user_id) ' . $order_type . '
        ');
        return $query->result();
    }
}

