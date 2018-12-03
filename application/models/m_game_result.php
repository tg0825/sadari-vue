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
    
    /**
     * 게임 아이디로 해당 인원 찾기
     * @return [type] [description]
     */
    public function get_game_id_member($id)
    {
        try {
            $this->load->database();
            
            $this->db->select('user_id');
            $this->db->from('game_result');
            $this->db->where('game_id', $id);
            $query = $this->db->get();
            return $query->result();
        } catch (Exception $e) {
            return 'error';
        }
    }
}
