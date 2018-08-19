<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');

$team_id = mysqli_real_escape_string($mysqli, $_POST['team_id']);

// 사용하고 있는 유저 있는지 검사
$sql = "SELECT * from member WHERE team_id='$team_id'";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
?>
<script type="text/javascript">
    alert('팀을 사용하고 있습니다. 다른 팀으로 옮기고 삭제해 주세요');
    window.location.href = '/admin';
</script>
<?php
} else {
    $sql = "DELETE from team WHERE team_id='$team_id'";

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
    <script>
        window.location = '<?=$_SERVER['HTTP_REFERER']?>';
    </script>
<?php
}
// 접속 끊기
$mysqli->close();
?>
