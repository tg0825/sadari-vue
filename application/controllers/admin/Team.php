<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class team extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->load->model('m_team');
        $team_list = $this->m_team->get_all();
        $data = [
            'team_list' => $team_list
        ];

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/team.php', $data);
        $this->load->view('admin/layout/footer.php');
    }

    public function add()
    {
        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/team-add.php');
        $this->load->view('admin/layout/footer.php');
    }

    public function edit_submit()
    {
        $this->load->helper('url');
        $data = [
            'team' => $_POST['team'],
            'team_eng' => $_POST['team_eng'],
            'team_color' => $_POST['team_color']
        ];

        $this->load->model('m_team');
        $result = $this->m_team->edit($data);
        redirect('/admin/team');
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
