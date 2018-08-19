<?php
session_start();
require_once($_SERVER['DOCUMENT_ROOT'] . '/dbconfig.php');
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

<!-- app css -->
<link rel="stylesheet" href="/resources/src/vendor/font-awesome/css/font-awesome.css">
<link rel="stylesheet" href="/resources/src/css/tg-util.css">
<link rel="stylesheet" href="/resources/src/css/admin.css">

<!-- vendor -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>

<!-- app js -->
<script src="/resources/src/js/admin.js"></script>

<title>SADARI ADMIN</title>
</head>
<?php
if (!isset($_SESSION['member_id'])) {
?>
<script>
    window.location.href = '/login.php';
</script>
<?php
}
?>
<body>
<div class="container-fluid">
<?php
    require_once(PATH_ADMIN . '/layout/header.php');
?>
