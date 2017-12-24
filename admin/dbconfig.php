<?php
// dev
$server = '127.0.0.1';
$username = 'root';
$password = 'root';
$db = 'sadari';

// heroku
if (getenv("CLEARDB_DATABASE_URL")) {
    $url = parse_url(getenv("CLEARDB_DATABASE_URL"));
    $server = $url["host"];
    $username = $url["user"];
    $password = $url["pass"];
    $db = substr($url["path"], 1);
}

$mysqli = new mysqli($server, $username, $password, $db);

if($mysqli->connect_error){
    die('Connect Error:('.$mysqli->connect_errno.') '.$mysqli->connect_error);
}

$sql = "SELECT * FROM member";
$result = $mysqli->query($sql);
