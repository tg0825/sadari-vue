<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');
session_start();

if (!isset($_POST['member_id']) || !isset($_POST['member_password'])) {
?>
<script>
    alert('필수 정보가 없습니다.');
    window.location.href = '/';
</script>
<?php
} else {
    $member_id = mysqli_real_escape_string($mysqli, $_POST['member_id']);
    $member_password = mysqli_real_escape_string($mysqli, $_POST['member_password']);

    $sql = "SELECT *
            from user
            where id = '$member_id'
            and password = password('$member_password')";

    $result = $mysqli->query($sql);

    if ($result->num_rows < 1) {
    ?>
    <script>
        alert('아이디와 비밀번호를 확인해주세요.');
        window.location.href = 'login.php';
    </script>
    <?php
    } else {
        $_SESSION['member_id'] = $member_id;
    ?>
    <script>
        window.location.href = 'admin/index.php';
    </script>
    <?php
    }
}
?>
