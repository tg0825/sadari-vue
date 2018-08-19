<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');

$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$team_id = mysqli_real_escape_string($mysqli, $_POST['team_id']);

$sql = "SELECT name
    from member
    WHERE name='$name'";
if ($mysqli->query($sql)->num_rows > 0) {
    ?>
    <script>
        var msg = '';
        if (confirm('같은 이름이 있습니다. 추가 하시겠습니까?')) {
            msg = '추가 완료';
        } else {
            msg = '추가 실패';
        }
        alert(msg);
    </script>
    <?php
} else {
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
}

$mysqli->close();
?>
<script>
    window.location.href = '/admin';
</script>
