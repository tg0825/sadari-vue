<?php
require_once("dbconfig.php");

$id = mysqli_real_escape_string($mysqli, $_POST['id']);
$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$team_id = mysqli_real_escape_string($mysqli, $_POST['team_id']);

$sql = "UPDATE member SET name = '$name', team_id = '$team_id' WHERE id = '$id'";
$result = $mysqli->query($sql);

// 접속 끊기
$mysqli->close();
