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
        $result = $this->m_member->update($data, $id);
    }

    public function delete()
    {
        // <?php
        // require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');
        //
        // $name = mysqli_real_escape_string($mysqli, $_POST['name']);
        // $team_eng = mysqli_real_escape_string($mysqli, $_POST['team_eng']);
        //
        // $sql = "SELECT id AS iid
        //         from member AS m
        //         left join team  AS t
        //         ON m.team_id=t.team_id
        //         WHERE name='$name' AND team_eng='$team_eng'";
        //
        // $result = $mysqli->query($sql);
        //
        // $row = $result->fetch_assoc();
        // $id = $row['iid'];
        //
        //
        // $sql = "DELETE FROM member WHERE id=$id";
        // $mysqli->query($sql);
        //
        // // 접속 끊기
        // $mysqli->close();

        $id = $this->input->post('id');

        $this->load->model('m_member');
        $result = $this->m_member->delete($id);
    }
}
