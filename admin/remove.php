<?php
require_once("dbconfig.php");

$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$team = mysqli_real_escape_string($mysqli, $_POST['team']);

$sql = "SELECT id
        FROM member
        WHERE name='$name' AND team='$team'";

$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
$id = $row['id'];

$sql = "DELETE FROM member WHERE id=$id";
$mysqli->query($sql);

// 접속 끊기
$mysqli->close();
