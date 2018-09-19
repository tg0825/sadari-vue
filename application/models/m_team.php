<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class m_team extends CI_Model {
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

    public function edit($data)
    {
        $this->load->database();

        $result = $this->db->insert('team', [
            'team' => $data['team'],
            'team_eng' => $data['team_eng'],
            'team_color' => $data['team_color']
        ]);

        return $result;
    }
}
