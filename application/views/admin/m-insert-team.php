<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');

$team = mysqli_real_escape_string($mysqli, $_POST['team']);
$team_eng = mysqli_real_escape_string($mysqli, $_POST['team_eng']);
$team_color = mysqli_real_escape_string($mysqli, $_POST['team_color']);

// 유효성검사: 기존팀들 이름과 비교
$sql = "SELECT team
    FROM team
    WHERE team='$team'
        OR team_eng='$team_eng'
    ";
if ($mysqli->query($sql)->num_rows > 0) {
    ?>
    <script>
        alert('팀 추가 실패. \n<?=$team?>(<?=$team_eng?>)은(는) 이미 있는 팀 입니다.');
    </script>
    <?php
} else {
    $sql = "INSERT INTO team (team, team_eng, team_color)
        VALUES ('$team', '$team_eng', '$team_color')
    ";

    if ($mysqli->query($sql) === TRUE) {
    ?>
    <script>
        alert('성공!');
    </script>
    <?php
    } else {
    ?>
    <script>
        alert("Error: " . <?=$sql?> . "<br>" . <?=$mysqli->error?>);
    </script>
    <?php
    }
    ?>
    <?php
$mysqli->close();
}
?>
<script>
    window.location.href = '/admin';
</script>
