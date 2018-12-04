<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class game extends CI_Controller {
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
        
        try {
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
                $result[$i]['group_name'] = $result_item['group_name'] ?? '';
                
                $i += 1;
            }
            
            $result = $this->m_game_result->insert_batch($result);
            
            if ($this->db->trans_status() === false) {
                $this->db->trans_rollback();
                echo 'failed';
            } else {
                $this->db->trans_commit();
                echo 'success';
            }
        } catch (Exception $e) {
            echo 'error';
        }
    }
    
    /**
     * 마지막 멤버 리스트
     * @param int $type 게임 타입
     * @return string json_encode
     */
    public function last_member_list($type)
    {
        $this->load->model('m_game');
        $id = $this->m_game->get_last_id($type);
        
        $this->load->model('m_game_result');
        $member_list = $this->m_game_result->get_game_id_member($id);
        
        echo json_encode($member_list);
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
