<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class m_member extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function get_all($sw = null)
    {
        $this->load->database();

        $this->db->select('*');
        $this->db->from('member as m');
        $this->db->join('team as t', 'm.team_id = t.team_id', 'left outer');

        if($sw){
           $this->db->like('name', $sw);
        }

        $query = $this->db->get();
        return $query->result();
    }

    public function get_item($id)
    {
        $this->load->database();

        $this->db->select('*');
        $this->db->from('member as m');
        $this->db->join('team as t', 'm.team_id = t.team_id', 'left outer');
        $this->db->where('m.id', $id);
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

    public function update($data)
    {
        $this->load->database();

        $this->db->set($data);
        $this->db->where('id', $data['id']);
        return $this->db->update('member');
    }

    public function delete($id)
    {
        $this->load->database();

        $this->db->where('id', $id);
        return $this->db->delete('member');
    }

    public function get_search($sw)
    {
        $this->load->database();
        $this->db->select('*');
        $this->db->from('member AS m');
        $this->db->join('team AS t', 'm.team_id = t.team_id');
        $this->db->where("name LIKE '%{$sw}%'");
        $query = $this->db->get();

        return $query->result();
    }
}
