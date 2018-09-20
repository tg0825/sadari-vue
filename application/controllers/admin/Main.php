<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class main extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
    {
        $this->load->model('m_member');
        $this->load->model('m_team');

        $member_list = $this->m_member->get_all();
        $team_list = $this->m_team->get_all();

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/index', [
            'member_list' => $member_list,
            'team_list' => $team_list
        ]);
        $this->load->view('admin/layout/footer.php');
    }

    public function login()
    {
        $this->load->view('admin/login.php');
    }

    public function login_process()
    {
        $this->load->view('admin/login-process');
    }

    public function search()
    {
        $sw = $this->input->get('sw');
        $this->load->model('m_member');
        $result = $this->m_member->get_search($sw);
        echo json_encode($result);
    }
}
