<?php
// session_start();
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no">

<link rel="icon" href="./resources/src/image/favicon.ico">
<link rel="apple-touch-icon" href="./resources/src/image/home-sadari.png">
<link rel="stylesheet" href="/resources/src/css/reset.css">
<link rel="stylesheet" href="/resources/src/css/tg-util.css">
<link rel="stylesheet" href="/resources/src/css/layout.css">
<link rel="stylesheet" href="/resources/src/css/button.css">
<link rel="stylesheet" href="/resources/src/css/webfont.css">
<link rel="stylesheet" href="/resources/src/css/style.css">
<link rel="stylesheet" href="/resources/src/css/ju.css">
<link rel="stylesheet" href="/resources/src/css/modal.css">
<link rel="stylesheet" href="/resources/src/vendor/font-awesome/css/font-awesome.css">
<link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet">

<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>

<title>game SADARI</title>

<script>
var OneSignal = window.OneSignal || [];
OneSignal.push(function() {
    OneSignal.init({
        appId: "3f4bd3dc-0b38-406f-a3d8-af67cae9d044",
    });
});
</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-116893453-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-116893453-1');
</script>

</head>
<body>
    <div class="gnb">
        <button
            class="resultTextToggle"
            data-sadari="result-toggle"
        >텍스트 결과 보기</button>
        <div class="clock"></div>
        <span>
            <?php
            if (!isset($_SESSION['member_id'])) {
            ?>
            <!-- <a href="./login.php">로그인</a> -->
            <!-- <a href="./signup.php">회원가입</a> -->
            <?php
            } else {
            ?>
            <!-- <a href="./admin/index.php">관리자</a> -->
            <?php
            }
            ?>
        </span>
    </div>
    <div class="layout-wrap sadari wrap">
        <h1 class="sadari title">
            SADARI
            <div class="member-list number"></div>
        </h1>


        <div class="layout-member">
            <div class="member-list wrap">
                <div class="member-list body">
                    <?php
                    foreach($member_list as $member) {
                    ?>
                        <div
                            class="member-list member <?=$member->team_eng?>"
                            style="background-color:<?=$member->team_color ?? '#ddd'?>"
                            data-team-eng="<?=$member->team_eng?>"
                            data-team-color="<?=$member->team_color?>"
                        >
                            <span class="name"><?=$member->name?></span>
                            <span class="team"><?=$member->team ?? '미정'?></span>
                            <span class="remove">x</span>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            </div>
        </div>

        <div class="layout-controller">
            <div class="sadari-select">
                <div>
                    <button class="btn ta-l" data-game="one">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        한명 뽑기 (또는 여러명)
                    </button>
                </div>
                <div>
                    <button class="btn ta-l" data-game="jo_member">
                        <i class="fa fa-random" aria-hidden="true"></i>
                        랜덤 조 (인원기준)
                    </button>
                </div>
                <div>
                    <button class="btn ta-l" data-game="jo_team">
                        <i class="fa fa-random" aria-hidden="true"></i>
                        랜덤 조 (팀 기준)
                    </button>
                </div>
                <div>
                    <button class="btn ta-l" data-game="ju">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        주번 뽑기
                    </button>
                </div>
            </div>

            <div class="tab">
                <div class="tab-item">
                    <div class="form-block">
                        딱!
                        <input class="ta-r" id="onlyOne" name="onlyOne" type="number" value="1">
                        명만 뽑기
                    </div>
                </div>

                <div class="tab-item">
                    <div class="form-block">
                        <label for=""></label>
                        한 조당
                        <input class="ta-r" id="groupMember" name="groupMember" type="number" value="3">
                        명
                    </div>
                </div>

                <div class="tab-item">
                    <div class="form-block">
                        <label for=""></label>
                        총
                        <input class="ta-r" id="groupCount" name="groupCount" type="number" value="5">
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
        </div>

        <div class="result"> </div>
        <div class="resultText" style="display:none">
            <textarea></textarea>
            <button class="result-copy" type="button" name="copy">결과 복사하기</button>
            <button
                data-sadari="result-toggle"
                class="result-close"
            type="button"> <i class="fa fa-times" aria-hidden="true"></i> </button>
        </div>
    </div>

    <script src="./resources/src/js/config.js"></script>
    <script src="./resources/src/js/storage.js"></script>
    <script src="./resources/src/js/data.js"></script>
    <script src="./resources/src/js/modal.js"></script>
    <script src="./resources/src/js/clock.js"></script>
    <script src="./resources/src/js/script.js"></script>
</body>
</html>
