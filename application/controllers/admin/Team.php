<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Team extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
    {
        $data = [];

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/team.php', $data);
        $this->load->view('admin/layout/footer.php');
    }
}
