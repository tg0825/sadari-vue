<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');

$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$team_id = mysqli_real_escape_string($mysqli, $_POST['team_id']);

$sql = "INSERT INTO member (name, team_id) VALUES ('$name', '$team_id')";

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
