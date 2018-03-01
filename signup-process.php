<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');
session_start();

$member_id = mysqli_real_escape_string($mysqli, $_POST['member_id']);
$member_password = mysqli_real_escape_string($mysqli, $_POST['member_password']);

$sql = "INSERT INTO user (id, password)
        VALUES ('$member_id', password('$member_password'))";
$result = $mysqli->query($sql);

if ($result) {
    $_SESSION['member_id'] = $member_id;
?>
<script>
    alert('회원가입 성공!');
    window.location.href = '/';
</script>
<?php
} else {
?>
<script>
    alert('회원가입 실패 :(');
    window.history.back();
</script>
<?php
}
?>
