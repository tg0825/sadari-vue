<?php
require_once("dbconfig.php");

$id = mysqli_real_escape_string($mysqli, $_POST['id']);
$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$team = mysqli_real_escape_string($mysqli, $_POST['team']);

$sql = "UPDATE member SET name = '$name', team = '$team' WHERE id = '$id'";
$result = $mysqli->query($sql);

// 접속 끊기
$mysqli->close();
