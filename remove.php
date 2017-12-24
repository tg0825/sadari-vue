<?php
//db에 접속, 호스트명, 사용자명, 패스워드 데이터베이스명
$mysqli = new mysqli('127.0.0.1', 'root', 'root', 'sadari');

if($mysqli->connect_error){
    die('Connect Error:('.$mysqli->connect_errno.') '.$mysqli->connect_error);
}

$name = mysqli_real_escape_string($mysqli, $_POST['name']);

$sql = "DELETE FROM member where name='$name'";

if ($mysqli->query($sql) === TRUE) {
?>
<script>
    alert('성공!');
</script>
<?php
} else {
?>
<script>
    alert("Error: " . $sql . "<br>" . $mysqli->error);
</script>
<?php
}

// 접속 끊기
$mysqli->close();

?>
<script>
window.location = "/"
</script>
