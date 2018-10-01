<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class member extends CI_Controller {
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

    public function search()
    {
        $sw = $this->input->get('sw');
        $this->load->model('m_member');
        $result = $this->m_member->get_search($sw);
        echo json_encode($result);
    }

	public function edit($id = null)
    {
        $data = [];

        if ($id) {
            $this->load->model('m_member');
            $data['member'] = (array)$this->m_member->get_item($id)[0];
        }

        $this->load->model('m_team');
        $data['team_item_list'] = $this->m_team->get_all();

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/member-add.php', $data);
        $this->load->view('admin/layout/footer.php');
    }

    // 저장
    public function edit_submit($id = null)
    {
        $this->load->helper('url');
        $data = [
            'name' => $this->input->post('name'),
            'team_id' => $this->input->post('team_id')
        ];

        $this->load->model('m_member');

        if ($id) {
            $data['id'] = $id;
            $result = $this->m_member->update($data);
        } else {
            $result = $this->m_member->add($data);
        }

        redirect('/admin/member');
    }

    // 삭제
    public function delete()
    {
        $id = $this->input->post('id');

        $this->load->model('m_member');
        $result = $this->m_member->delete($id);
    }
}
