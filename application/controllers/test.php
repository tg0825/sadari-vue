<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class game extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
	{
        $this->load->model('m_member');
        $member_list = $this->m_member->get_all();
		$this->load->view('game', [
            'member_list' => $member_list
        ]);
	}
}
