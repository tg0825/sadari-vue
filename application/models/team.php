<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Team extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function get_all()
    {
        $this->load->database();

        $this->db->select('*');
        $this->db->from('team');
        $query = $this->db->get();
        return $query->result();
    }

    public function add($data)
    {
        $this->load->database();

        $this->db->insert('member', [
            'name' => $data['name'],
            'team_id' => $data['team_id']
        ]);
    }
}
