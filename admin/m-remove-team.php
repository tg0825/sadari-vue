<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');

$team_id = mysqli_real_escape_string($mysqli, $_POST['team_id']);

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

// 접속 끊기
$mysqli->close();
?>
<script>
    window.location = '<?=$_SERVER['HTTP_REFERER']?>';
</script>
