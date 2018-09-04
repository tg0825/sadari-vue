<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Member extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function get_all()
    {
        $this->db->select('*');
        $this->db->from('member as m');
        $this->db->join('team as t', 'm.team_id = t.team_id');
        $query = $this->db->get();
        if(count($query->result()) > 0){
            return $query->result();
        }else{
            return false;
        }
    }
}
