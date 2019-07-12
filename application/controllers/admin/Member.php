<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class member extends CI_Controller {
    // 직원 이름
    private $username;
    
    public function __construct()
    {
        parent::__construct();
        $this->check_login();
        $this->username = $this->session->userdata('username');
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
        $this->load->model('m_member');
        $this->load->model('m_team');
        $sw = $this->input->get('sw') ?? '';
        $username = $this->session->userdata('username');

        $member_list = $this->m_member->get_all($sw);
        $team_list = $this->m_team->get_all();

        $this->load->view('admin/layout/head.php', [
            'username' => $username
        ]);
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

	public function detail($id = null)
    {
        $data = [];

        if ($id) {
            $this->load->model('m_member');
            $data['member'] = (array)$this->m_member->get_item($id)[0];
        }

        $this->load->model('m_team');
        $data['team_item_list'] = $this->m_team->get_all();

        $this->load->view('admin/layout/head.php', [
            'username' => $this->username
        ]);
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/member-detail.php', $data);
        $this->load->view('admin/layout/footer.php');
    }

    // 저장
    public function submit($id = null)
    {
        $this->load->helper('url');
        $post = $this->input->post();
        
        $data = [
            'name' => $post['name'],
            'team_id' => $post['team_id'],
            'position' => $post['position']
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
