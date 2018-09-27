<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class main extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
    {
        $this->load->helper('url');
        redirect('admin/member');
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
