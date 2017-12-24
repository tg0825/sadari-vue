<?php
//db에 접속, 호스트명, 사용자명, 패스워드 데이터베이스명
$mysqli = new mysqli('127.0.0.1', 'root', 'root', 'sadari');

if($mysqli->connect_error){
    die('Connect Error:('.$mysqli->connect_errno.') '.$mysqli->connect_error);
}

$name = mysqli_real_escape_string($mysqli, $_POST['name']);

$sql = "SELECT id FROM member WHERE name='$name'";

$result = $mysqli->query($sql);

$id = $result;

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    ?>
        <?=$row['id']?>
    <?php
    }
} else {
    ?>
    없음
    <?php
}

$sql = "UPDATE member SET name='$name' WHERE id='$id'";

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
