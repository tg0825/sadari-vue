<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
    {
        $this->load->model('member');
        $data['member_list'] = $this->member->get_all();

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/index', $data);
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
}
