<?php
$mysqli = new mysqli('127.0.0.1', 'root', 'root', 'sadari');

if($mysqli->connect_error){
    die('Connect Error:('.$mysqli->connect_errno.') '.$mysqli->connect_error);
}

$sql = "SELECT *
        from member AS m
        left join team  AS t
        ON m.team_id=t.team_id";
$result = $mysqli->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

<link rel="stylesheet" href="resources/css/webfont.css">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="font-awesome/css/font-awesome.css">

<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>

<title>SADARI</title>
</head>
<body>
    <div class="gnb">
        <button class="resultTextToggle">텍스트 결과 보기</button>
        <button class="toggleMenu">인원 추가</button>
        <div class="clock"></div>
    </div>
    <div class="dice wrap">
        <h1 class="dice title">SADARI</h1>
        <div id="frm">
            <form id="JSFORM" action="insert.php" method="post" autocomplete="off">
                <button
                    type="button"
                    class="reset"
                >인원초기화</button>
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
                    >
                </div>
                <div class="form-block">
                    <div class="team-list"></div>
                </div>
                <button type="submit" class="btn-add-mem">추가</button>
            </form>
        </div>

        <div class="member-list wrap">
            <div class="member-list body">
            <?php
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                    ?>
                    <div
                        class="member-list member <?=$row['team_eng']?>"
                        style="background-image:url()"
                        data-team-eng="<?=$row['team_eng']?>"
                    >
                        <span class="name"><?=$row['name']?></span>
                        <span class="team"><?=$row['team']?></span>
                        <span class="remove">x</span>
                    </div>
                    <?php
                    }
                } else {
                    ?>
                    없음
                    <?php
                }
            ?>
            </div>
            <div class="member-list number"></div>
        </div>

        <div class="dice-select">
            <div><button class="btn" data-game="one">한명 뽑기 (또는 여러명)</button></div>
            <div><button class="btn" data-game="jo-member">랜덤 조 (인원기준)</button></div>
            <div><button class="btn" data-game="jo-team">랜덤 조 (팀 기준)</button></div>
            <div><button class="btn" data-game="ju">주번 뽑기</button></div>
        </div>

        <div class="tab">
            <div class="tab-item">
                <div class="form-block">
                    딱!
                    <input id="onlyOne" name="onlyOne" type="number" value="1">
                    명만 뽑기
                </div>
            </div>

            <div class="tab-item">
                <div class="form-block">
                    <label for=""></label>
                    한 조당
                    <input id="groupMember" name="groupMember" type="number" value="3">
                    명
                </div>
            </div>

            <div class="tab-item">
                <div class="form-block">
                    <label for=""></label>
                    총
                    <input id="groupCount" name="groupCount" type="number" value="5">
                    개 조 만들기
                </div>
            </div>

            <div class="tab-item">
                <div class="tab-item-result"></div>
                <div class="ju-add">
                    <div class="form-block">
                        <label for="">주번 항목 추가</label>
                        <div class="input-text">
                            <input id="name" name="name" type="text" placeholder="창문닦이 기타 등등" maxlength="10">
                        </div>
                        <button type="submit" class="btn-add-mem">추가</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="start-root">
            <button class="start" type="submit">시작!</button>
        </div>

        <div class="option root">
            <label class="option item">
                <input type="checkbox" data-option="number">
                번호 표시
            </label>
        </div>

        <div class="result"> </div>
        <div class="resultText" style="display:none">
            <textarea></textarea>
            <button type="button" name="copy">결과 복사하기</button>
        </div>
    </div>
    <script src="data.js"></script>
    <script src="modal.js"></script>
    <script src="clock.js"></script>
    <script src="script.js"></script>
</body>
</html>
