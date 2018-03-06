<?php
require_once(__DIR__ . '/head.php');

$sql = "SELECT * FROM member";
$result = $mysqli->query($sql);

?>
<body>
<?php
    require_once('./header.php');
?>
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
        $sql = "SELECT *
                from member AS m
                left join team  AS t
                ON m.team_id=t.team_id";
        $result = $mysqli->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
            ?>
                <tr data-member-id="<?=$row['id']?>" data-is-edit="false">
                    <td data-member="name"><?=$row['name']?></td>
                    <td data-member="team" data-member-eng="<?=$row['team_eng']?>"><?=$row['team']?></td>
                    <td data-member="option">
                        <button type="type" data-member="edit" name="button">수정</button>
                        <button type="type" data-member="delete" name="button">삭제</button>
                    </td>
                </tr>
            <?php
            }
        } else {
            ?>
            <tr>
                <td colspan="3">
                    없음
                </td>
            </tr>
            <?php
        }
        ?>
        </tbody>
    </table>
</div>

<form id="JSFORM" action="/admin/m-insert.php" method="post" autocomplete="off">
    <h2>
        <i class="fa fa-male" aria-hidden="true"></i>
        인원추가
    </h2>
    <div class="form-block">
        <input
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요."
            maxlength="10"
            required
        >
        <!-- <input type="text" placeholder="역할" name="position" value=""> -->
        <!-- <input type="text" placeholder="입사일자" name="start_date" value=""> -->
    </div>
    <div class="form-block">
        <div class="team-list"></div>
        <?php
        $sql = 'SELECT * FROM team';

        $result = $mysqli->query($sql);
        if ($result->num_rows > 0) {
        ?>
            <select id="team_list" class="" name="team_id">
            <?php
            while($row = $result->fetch_assoc()) {
            ?>
                <option value="<?=$row['team_id']?>"><?=$row['team']?></option>
            <?php
            };
            ?>
            </select>
        <?php
        }
        ?>
    </div>
    <button type="submit" class="btn-add-mem">추가</button>
</form>

<form id="" action="/admin/m-insert-team.php" method="post" autocomplete="off">
    <h2>
        <i class="fa fa-male" aria-hidden="true"></i>
       팀 추가
    </h2>
    <div class="form-block">
        <div class="">
            <input
                id="name"
                name="team"
                type="text"
                placeholder="팀 한글명을 입력해주세요."
                required
            >
        </div>
        <div>
            <input
                id="name"
                name="team_eng"
                type="text"
                placeholder="팀 영문명을 입력해주세요."
                required
            >
        </div>
    </div>
    <button type="submit" class="btn-add-mem">추가</button>
</form>

<script>
(function () {
var member_list = document.querySelector('#member_list');

function valid(message) {
    return function (input) {
        var inp = input;
        var msg = message;
        var value = inp[0].value;

        if (value === '') {
            alert(msg);
            inp.focus();
            return false;
        }

        return true;
    }
}

var val = {
    name: valid('이름을 입력해주세요.'),
};

// 삭제
function removeMember(e) {
    var self = e.target;
    var tr = self.parentNode.parentNode;

    if (self.tagName === 'BUTTON' && self.dataset.member === 'delete') {
        if (!confirm('삭제하시겠습니까?')) return;
        var btn = self;
        var $tr = $(btn).parents('tr');
        var api = '/admin/m-remove.php';
        var param = {
            name: tr.querySelector('[data-member=name]').textContent.trim(),
            team_eng: tr.querySelector('[data-member-eng]').dataset.memberEng,
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
    };

    function reset(e) {
        $(member_list).find('tr').each(function (i, e) {
            var $tr = $(e);
            var $name = $tr.find('[data-member=name]');
            var $team = $tr.find('[data-member=team]');
            var $teamSelect = $tr.find('#team_list');
            var $editBtn = $tr.find('[data-member=edit]');

            var nameText = $name.find('[data-member=edit-input]').val();
            var originName = $name.attr('data-origin-name');
            var teamText = $team.text();
            var originTeam = $team.attr('data-origin-team');

            $name.text(originName || nameText);
            $team.text(teamText);
            if ($teamSelect.length) {
                teamText = originTeam || teamText;
                $team.text(teamText);
            }
            $editBtn.text(btnText.edit);
            $tr.attr('data-is-edit', 'false');
        });
    }

    function update(obj) {
        var api = '/admin/m-update.php';
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
        var $name = $tr.find('[data-member=name]');
        var $team = $tr.find('[data-member=team]');
        var is_edit = $tr.attr('data-is-edit');

        var originName = $tr.find('[data-member=name]').text();
        var originTeam = $team.text();

        if (is_edit === 'false') {
            reset();

            // 이름
            var $nameInput = $('<input data-member="edit-input" />');
            var nameText = $name.text();
            $name
                .attr('data-origin-name', originName)
                .html($nameInput.val(nameText));

            // 팀
            var $temeListClone = $('#team_list').clone();
            $team
                .attr('data-origin-team', originTeam)
                .html($temeListClone);

            // 수정 버튼
            $tr.find('[data-member=edit]').text(btnText.complete);
            $tr.attr('data-is-edit', 'true');

            $name.find('input').focus();
        }
        else {
            var $nameInput = $name.find('input');
            var newName = $nameInput.val();
            var $select = $team.find('select');
            var $selectedOption = $select.find('option:selected')
            var selectedText = $selectedOption.text();
            var selectedValue = $selectedOption.val();

            if(!val.name($nameInput)) return;

            $name.text(newName);
            $team.text(selectedText);

            update({
                id: $tr.attr('data-member-id'),
                name: $tr.find('[data-member=name]').text(),
                team_id: selectedValue,
            });
            $tr.attr('data-is-edit', 'false');
        }
    }
}());

$(member_list).on('click', '[data-member=edit]', edit);
member_list.addEventListener('click', removeMember);
}());
</script>
</body>
</html>
