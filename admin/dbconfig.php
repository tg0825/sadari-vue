<?php
$mysqli = new mysqli('127.0.0.1', 'root', 'root', 'sadari');

if($mysqli->connect_error){
    die('Connect Error:('.$mysqli->connect_errno.') '.$mysqli->connect_error);
}

$sql = "SELECT * FROM member";
$result = $mysqli->query($sql);
