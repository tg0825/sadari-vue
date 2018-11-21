<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_team extends CI_Model {
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

    public function get_item($id)
    {
        $this->load->database();

        $this->db->select('*');
        $this->db->from('team');
        $this->db->where('team_id', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function add($data)
    {
        $this->load->database();

        $result = $this->db->insert('team', [
            'team' => $data['team'],
            'team_eng' => $data['team_eng'],
            'team_color' => $data['team_color']
        ]);

        return $result;
    }

    public function update($data)
    {
        $this->load->database();
        $this->db->where('team_id', $data['team_id']);
        $result = $this->db->update('team', $data);
        return $result;
    }

    public function delete($data)
    {
        $this->load->database();
        $this->db->where('team_id', $data['team_id']);
        $result = $this->db->delete('team');
        return $result;
    }
}
