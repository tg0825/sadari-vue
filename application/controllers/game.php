<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Game extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
	{
        $this->load->model('m_member');
        $member_list = $this->m_member->get_all();
		$this->load->view('game', [
            'member_list' => $member_list
        ]);
	}
    
    /**
     * 게임 실행 기록 저장
     */
    public function insert()
    {
        $data = $this->input->post();
        
        $this->load->database();
        $this->db->trans_begin();
        
        $this->load->model('m_game');
        $game_id = $this->m_game->insert($data['game_type']);
        
        $this->load->model('m_game_result');
        $data['game_id'] = $game_id;
        
        $i = 0;
        $result = [];
        forEach($data['result_data'] as $result_item) {
            $result[$i]['game_id'] = $game_id;
            $result[$i]['game_type'] = $data['game_type'];
            $result[$i]['user_id'] = $result_item['user_id'];
            $result[$i]['group_name'] = $result_item['group_name'];
            
            $i += 1;
        }
        
        $result = $this->m_game_result->insert_batch($result);
        
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }
    
	public function result($type)
	{
        $this->load->model('m_member');
        $member_list = $this->m_member->get_all();
		$this->load->view('game', [
            'member_list' => $member_list
        ]);
	}
}
