<?php
require_once("dbconfig.php");

$team = mysqli_real_escape_string($mysqli, $_POST['team']);
$team_eng = mysqli_real_escape_string($mysqli, $_POST['team_eng']);

$sql = "INSERT INTO team (team, team_eng) VALUES ('$team', '$team_eng')";

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
    // window.location = '<?=$_SERVER['HTTP_REFERER']?>';
</script>
