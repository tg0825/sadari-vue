<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class member extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    // member list
	public function index()
	{
        $this->load->model('m_member');
        $member_list = $this->m_member->get_all();
        echo json_encode($member_list);
	}
}
