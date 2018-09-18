<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

	public function index()
    {
        $this->load->model('member');
        $result = $this->member->get_all();

        $this->load->view('admin/layout/head.php');
        $this->load->view('admin/layout/lnb.php');
        $this->load->view('admin/index', [
            'member_list' => $result
        ]);
        $this->load->view('admin/layout/footer.php');
    }

    public function login()
    {
        $this->load->view('admin/login.php');
    }

    public function login_process()
    {
        $this->load->view('admin/login-process');
    }

    public function search()
    {
        $sw = $this->input->get('sw');
        $this->load->model('member');
        $result = $this->member->get_search($sw);
        echo json_encode($result);
        // // dev
        // $server = '127.0.0.1';
        // $username = 'root';
        // $password = 'root';
        // $db = 'sadari';

        // heroku
        // if (getenv("CLEARDB_DATABASE_URL")) {
        //     $url = parse_url(getenv("CLEARDB_DATABASE_URL"));
        //     $server = $url["host"];
        //     $username = $url["user"];
        //     $password = $url["pass"];
        //     $db = substr($url["path"], 1);
        // }

        // $mysqli = new mysqli($server, $username, $password, $db);
        // $mysqli->query("set session character_set_connection=utf8;");
        // $mysqli->query("set session character_set_results=utf8;");
        // $mysqli->query("set session character_set_client=utf8;");

        // if($mysqli->connect_error){
        //     die('Connect Error:('.$mysqli->connect_errno.') '.$mysqli->connect_error);
        // }

        // $searchAll = [];
        // if (isset($_GET['sw']) && $_GET['sw']) {
        //     $sw = $_GET['sw'];
        //     $sql = "SELECT * from member AS m left join team AS t ON m.team_id=t.team_id WHERE name LIKE '%" . $sw . "%'";
        //     $result = $mysqli->query($sql);
        //     while ($row = $result->fetch_assoc()) {
        //         $searchAll[] = $row;
        //     }
        // }
        // echo json_encode($searchAll);
    }
}
