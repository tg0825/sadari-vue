<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');

$sw = '';
$searchAll = [];
if (isset($_GET['sw']) && $_GET['sw']) {
    $sw = $_GET['sw'];
    $sql = "SELECT * from member AS m left join team AS t ON m.team_id=t.team_id WHERE name LIKE '%" . $sw . "%'";
    $result = $mysqli->query($sql);
    while ($row = $result->fetch_assoc()) {
        $searchAll[] = $row;
    }
} 

echo json_encode($searchAll);
