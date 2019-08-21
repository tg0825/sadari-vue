<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class auth extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function login()
    {
        $this->load->view('admin/login');
    }

    public function process()
    {
        $this->load->helper('url');
        $this->load->model('m_user');
        $result = $this->m_user->validate();

        if ($result) {
            redirect('admin/main');
        } else {
            $this->login();
        }
    }

    public function logout()
    {
        $this->load->helper('url');
        $this->session->sess_destroy();
        redirect('/');
    }
}
