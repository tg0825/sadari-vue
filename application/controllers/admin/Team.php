<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class team extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->check_login();
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
        $this->load->model('m_team');
        $team_list = $this->m_team->get_all();
        $username = $this->session->userdata('username');
        $data = [
            'team_list' => $team_list
        ];

        $this->load->view('admin/layout/head.php', [
            'username' => $username
        ]);
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/team.php', $data);
        $this->load->view('admin/layout/footer.php');
    }

    public function edit($id = null)
    {
        $this->load->model('m_team');
        $data = [];

        if ($id) {
            $data = $this->m_team->get_item($id);
            $data = (array)$data[0];
        }

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/team-add.php', $data);
        $this->load->view('admin/layout/footer.php');
    }

    public function edit_submit()
    {
        $this->load->helper('url');

        $is_update = $_POST['team_id'];

        if ($is_update) {
            $this->update();
        } else {
            $this->add();
        }

        redirect('/admin/team');
    }

    private function add()
    {
        $data = [
            'team' => $_POST['team'],
            'team_eng' => $_POST['team_eng'],
            'team_color' => $_POST['team_color']
        ];

        $this->load->model('m_team');
        $this->m_team->add($data);
    }

    private function update()
    {
        $data = [
            'team_id' => $_POST['team_id'],
            'team' => $_POST['team'],
            'team_eng' => $_POST['team_eng'],
            'team_color' => $_POST['team_color']
        ];

        $this->load->model('m_team');
        $this->m_team->update($data);
    }

    public function delete()
    {
        $data = [
            'team_id' => $_POST['team_id'],
        ];

        $this->load->model('m_team');
        $result = $this->m_team->delete($data);
    }
}
