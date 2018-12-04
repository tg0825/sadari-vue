<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_user extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function validate()
    {
        $id = $this->input->post('member_id');
        $password = $this->input->post('member_password');

        $this->load->database();
        $this->db->where('id', $id);
        $this->db->where('password', $password);

        $query = $this->db->query("
            SELECT * FROM user
            WHERE id ='$id' 
            AND password = password('$password')
        ");
        
        $result = $query->row_array();

        if ($result) {
            $data = [
                'username' => $result['id'],
                'validated' => true
            ];
            $this->session->set_userdata($data);
            return true;
        } else {
            return false;
        }
    }
}

