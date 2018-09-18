<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Member extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function add()
    {
        $this->load->model('team');
        $result = $this->team->get_all();

        $data = [
            'team_list' => $result
        ];

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/member-add.php', $data);
        $this->load->view('admin/layout/footer.php');
    }

    public function add_process()
    {
        $data = [
            'name' => $this->input->post('name'),
            'team_id' => $this->input->post('team_id')
        ];

        $this->load->model('team');
        $result = $this->team->add($data);
        $this->load->view('admin/member-add-process.php');
    }
}
