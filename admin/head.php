<?php
session_start();
require_once("dbconfig.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<!-- <link rel="stylesheet" href="style.css"> -->
<link rel="stylesheet" href="font-awesome/css/font-awesome.css">
<link rel="stylesheet" href="/admin.css">

<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>

<title>SADARI ADMIN</title>

</head>
<?php
if (!isset($_SESSION['member_id']) || !isset($_SESSION['member_password'])) {
?>
<script>
    alert('로그인되지 않았습니다.');
    window.location.href = '/login.php';
</script>
<?php
}
?>
