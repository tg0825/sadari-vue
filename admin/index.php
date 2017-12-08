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
<link rel="stylesheet" href="/admin.css">

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
                <th>비고</th>
            </tr>
        </thead>
        <tbody>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
            ?>
                <tr data-member-id="<?=$row['id']?>">
                    <td data-member="name"><?=$row['name']?></td>
                    <td data-member="team"><?=$row['team']?></td>
                    <td data-member="option">
                        <button type="type" data-member="edit" name="button">수정</button>
                        <button type="type" data-member="delete" name="button">삭제</button>
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
(function () {
var member_list = document.querySelector('#member_list');

// 삭제
function removeMember(e) {
    var self = e.target;
    var tr = self.parentNode.parentNode;

    if (self.tagName === 'BUTTON' && self.dataset.member === 'delete') {
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

// 수정
var edit = (function () {
    // property
    var btnText = {
        complete: '완료',
        edit: '수정',
    }

    function reset() {
        $(member_list).find('tr').each(function (i, e) {
            var $tr = $(e);

            $tr.find('td').each(function (i, e) {
                var $td = $(e);
                var $input = $td.find('input[data-member=edit-input]');
                var $editBtn = $td.find('[data-member=edit]');

                $editBtn.text(btnText.edit);

                if ($input.length) {
                    var text = $input.val();
                    $td.text(text);
                }
            });

            $tr.attr('is_edit', 'false');
        });
    }

    function update(obj) {
        var api = '/admin/update-m.php';
        var param = obj;

        $.post(api, param)
            .done(function (response) {
                console.log(response);
                // alert('수정완료');
            })
    }

    return function (e) {
        var $self = $(e.currentTarget);
        var $tr = $self.parents('tr');
        var is_edit = $tr.attr('is_edit');

        reset();

        if (is_edit !== 'true') {
            $tr.find('td').each(function (i, e) {
                var $td = $(e);
                var $editBtn = $td.find('[data-member=edit]');
                var text = $td.text();
                var input = '<input data-member="edit-input" value="' + text + '" />';

                if ($td.attr('data-member') !== 'option') {
                    $td.html(input);

                }
                $editBtn.text(btnText.complete);
            });

            $tr.attr('is_edit', 'true');
        }
        else {
            update({
                id: $tr.attr('data-member-id'),
                name: $tr.find('[data-member=name]').text(),
                team: $tr.find('[data-member=team]').text(),
            });
            $tr.attr('is_edit', 'false');
        }
    }
}());

$(member_list).on('click', '[data-member=edit]', edit);
member_list.addEventListener('click', removeMember);
}());
</script>
</body>
</html>
