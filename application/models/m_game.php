<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_game extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 게임 저장
     * @param [type] $type [description]
     * @return int insert id
     */
    public function insert($type)
    {
        $this->load->database();
        $result = $this->db->insert('game', [
            'type' => $type,
        ]);
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }
    
    public function get_last_id($type)
    {
        try {
            $this->load->database();
            
            $this->db->select('id');
            $this->db->from('game');
            $this->db->where('type', $type);
            $this->db->order_by('id', 'desc');
            $query = $this->db->get();
            
            return $query->row()->id ?? '';
        } catch (Exception $e) {
            return 'error';
        }
    }
}
