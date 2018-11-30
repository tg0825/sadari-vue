<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_game_result extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 게임 저장
     * @param [type] $type [description]
     * @return [type] [description]
     */
    public function insert_batch($result)
    {
        $this->load->database();
        $result = $this->db->insert_batch('game_result', $result);
        return $result;
    }
}
