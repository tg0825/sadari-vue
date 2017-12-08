<?php
require_once("dbconfig.php");

$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$team = mysqli_real_escape_string($mysqli, $_POST['team']);
// $position = mysqli_real_escape_string($mysqli, $_POST['position']);
// $start_date = mysqli_real_escape_string($mysqli, $_POST['start_date']);

// attempt insert query execution
// $sql = "INSERT INTO member (name, team, position, start_date) VALUES ('$name', '$team', '$position', '$start_date')";
$sql = "INSERT INTO member (name, team) VALUES ('$name', '$team')";

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
window.location = "/"
</script>
