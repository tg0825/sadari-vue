<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class result extends CI_Controller {
    // 유저 이름
    private $username;
    
    public function __construct()
    {
        parent::__construct();
        $this->check_login();
        $this->username = $this->session->userdata('username');
    }

    private function check_login()
    {
        $this->load->helper('url');

        if (!$this->session->userdata('validated')) {
            redirect('/admin/login');
        }
    }

    public function index()
    {
        $get = $this->input->get();
        $result = [];
        $result_list = '';
        
        $filter = [
            'game_type' => $get['game_type'] ?? '',
            'filter_type' => $get['filter_type'] ?? ''
        ];
        
        
        if (count($get)) {
            $this->load->model('m_result');
            
            if ($filter['filter_type'] && $filter['filter_type'] != 1) {
                $result_list = $this->m_result->get_ranking_ordered($filter);
            }
            
            $result = [
                'result_list' => $result_list,
                'filter_type' => $get['filter_type']
            ];
        }
        
        $this->load->view('admin/layout/head.php', [
            'username' => $this->username
        ]);
        
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/result', $result);
        $this->load->view('admin/layout/footer.php');
    }
}
