<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class member extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function edit()
    {
        $this->load->model('m_team');
        $result = $this->m_team->get_all();

        $data = [
            'team_list' => $result
        ];

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/member-add.php', $data);
        $this->load->view('admin/layout/footer.php');
    }

    public function edit_submit()
    {
        $this->load->helper('url');
        $data = [
            'name' => $this->input->post('name'),
            'team_id' => $this->input->post('team_id')
        ];

        $this->load->model('m_member');
        $result = $this->m_member->add($data);
        redirect('/admin/member/edit');
    }

    public function update()
    {
        $data = [
            'name' => $this->input->post('name'),
            'team_id' => $this->input->post('team_id')
        ];

        $id = $this->input->post('id');

        $this->load->model('m_member');
        $result = $this->m_member->add($data, $id);
    }
}
