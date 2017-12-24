<?php
require_once("dbconfig.php");

$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$team_eng = mysqli_real_escape_string($mysqli, $_POST['team_eng']);

$sql = "SELECT id AS iid
        from member AS m
        left join team  AS t
        ON m.team_id=t.team_id
        WHERE name='$name' AND team_eng='$team_eng'";

$result = $mysqli->query($sql);

$row = $result->fetch_assoc();
$id = $row['iid'];


$sql = "DELETE FROM member WHERE id=$id";
$mysqli->query($sql);

// 접속 끊기
$mysqli->close();
