<?php
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

<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>

<title>SADARI ADMIN</title>
</head>
<body>
<h1>사다리 관리자</h1>
<h2>총인원</h2>
총 <?=$result->num_rows?> 명
<div>
    <table id="member_list">
        <thead>
            <tr>
                <th>이름</th>
                <th>팀</th>
            </tr>
        </thead>
        <tbody>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
            ?>
                <tr>
                    <td data-member="name"><?=$row['name'] === '' ? 'empty' : $row['name']?></td>
                    <td>
                        <span data-member="team">
                            <?=$row['team'] === '' ? 'empty' : $row['team']?>
                        </span>
                        <button type="type" data-member="delete" name="button">x</button>
                    </td>
                </tr>
            <?php
            }
        } else {
            ?>
            없음
            <?php
        }
        ?>
        </tbody>
    </table>
</div>
<button type="type" name="button">인원추가</button>
<script>
    var member_list = document.querySelector('#member_list');

    function removeMember(e) {
        var self = e.target;
        var tr = e.target.parentNode.parentNode;

        if (self.tagName === 'BUTTON') {
            var btn = self;
            var $tr = $(btn).parents('tr');
            var api = '/admin/remove.php';
            var param = {
                name: tr.querySelector('[data-member=name]').textContent.trim(),
                team: tr.querySelector('[data-member=team]').textContent.trim(),
            };

            $.post(api, param, function (response) {
                var res = response;
                $tr.remove();
            });
        }
    }

    member_list.addEventListener('click', removeMember);
</script>
</body>
</html>
