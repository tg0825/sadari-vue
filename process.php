<?php
session_start();

$member_id = 'user';
$member_password = 'password';

// 아이디, 비밀번호 일치

// 그 외
if (!isset($_POST['member_id']) || !isset($_POST['member_password'])) {
?>
<script>
    alert('필수 정보가 없습니다.');
    window.location.href = '/';
</script>
<?php
} else {
    if (
        strcmp($_POST['member_id'], $member_id) != 0
        || strcmp($_POST['member_password'], $member_password) != 0
    ) {
    ?>
    <script>
        alert('아이디와 비밀번호를 확인해주세요.');
        window.location.href = 'login.php';
    </script>
    <?php
    } else {
        $_SESSION['member_id'] = $_POST['member_id'];
        $_SESSION['member_password'] = $_POST['member_password'];
    ?>
    <script>
        alert('로그인 성공!');
        window.location.href = 'admin/index.php';
    </script>
    <?php
    }
}
?>
