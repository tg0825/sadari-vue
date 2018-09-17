<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Member extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
    {
        $data = [];

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/member-add', $data);
        $this->load->view('admin/layout/footer.php');
    }
}
