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
    <div class="layout-wrap sadari wrap js-all-check">
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
                        <label
                            class="member-list member <?=$member->team_eng?>"
                            style="background-color:<?=$member->team_color ?? '#ddd'?>"
                            data-member-id="<?=$member->id?>"
                            data-team-eng="<?=$member->team_eng?>"
                            data-team-color="<?=$member->team_color?>"
                        >
                            <input type="checkbox" class="js-all-check-item"/>
                            <span class="name"><?=$member->name?></span>
                            <span class="team"><?=$member->team ?? '미정'?></span>
                            <span class="remove">x</span>
                        </label>
                    <?php
                    }
                    ?>
                </div>
            </div>
        </div>

        <div class="layout-controller">
            <div class="sadari-select">
                <div>
                    <button 
                        class="btn ta-l"
                        data-game="one"
                        data-game-id="1"
                    >
                        <i class="fa fa-users" aria-hidden="true"></i>
                        한명 뽑기 (또는 여러명)
                    </button>
                </div>
                <div>
                    <button
                        class="btn ta-l"
                        data-game="jo_member"
                        data-game-id="2"
                    >
                        <i class="fa fa-random" aria-hidden="true"></i>
                        랜덤 조 (인원기준)
                    </button>
                </div>
                <div>
                    <button 
                        class="btn ta-l" 
                        data-game="jo_team"
                        data-game-id="3"
                    >
                        <i class="fa fa-random" aria-hidden="true"></i>
                        랜덤 조 (팀 기준)
                    </button>
                </div>
                <div>
                    <button
                        class="btn ta-l"
                        data-game="jo_lunch"
                        data-game-id="4"
                    >
                        <i class="fa fa-cutlery" aria-hidden="true"></i>
                        랜덤 점심
                    </button>
                </div>
                <div>
                    <button 
                        class="btn ta-l"
                        data-game="ju"
                        data-game-id="6"
                    >
                        <i class="fa fa-hand-paper-o" aria-hidden="true"></i>
                        손
                    </button>
                </div>
                <div>
                    <button 
                        class="btn ta-l"
                        data-game="ju"
                        data-game-id="5"
                    >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        청소 뽑기
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
                        <input class="ta-r" id="randomCount" name="randomCount" type="number" value="9">
                        개 조 만들기
                    </div>
                </div>
                
                <div class="tab-item">
                    <div class="form-block">
                        <label for=""></label>
                        총
                        <input class="ta-r" id="groupCount" name="groupCount" type="number" value="10">
                        개 조 만들기
                    </div>
                </div>
                
                <div class="tab-item js-tab-ju" data-tab-id="son">
                    <div class="tab-item-result"></div>
                    <div class="ju-add">
                        <div class="form-block">
                            <div class="input-text">
                                <input id="name" name="name" type="text" placeholder="이름" maxlength="10">
                            </div>
                            <button type="submit" class="btn-add-mem">추가</button>
                        </div>
                    </div>
                </div>
                
                <div class="tab-item js-tab-ju" data-tab-id="juList">
                    <div class="tab-item-result"></div>
                    <div class="ju-add">
                        <div class="form-block">
                            <div class="input-text">
                                <input id="name" name="name" type="text" placeholder="청소 항목 추가" maxlength="10">
                            </div>
                            <button type="submit" class="btn-add-mem">추가</button>
                        </div>
                    </div>
                    <div class="mt10">
                        <div class="form-block">
                            <button 
                                type="button"
                                class="btn btn-s btn-size-w exclude-prev-member"
                            >
                                <i class="fa fa-user-times" aria-hidden="true"></i>
                                이전 청소자 표시
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="start-root">
                <button class="start" type="submit">시작!</button>
            </div>
            
            <label>
                <input
                    type="checkbox"
                    class="js-all-check-master"
                    name=""
                    value=""
                >
                전체선택
            </label>
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

    <script src="./resources/src/js/store.js"></script>
    <script src="./resources/src/js/result-text.js"></script>
    <script src="./resources/src/js/slack.js"></script>
    <script src="./resources/src/js/head-count.js"></script>
    <script src="./resources/src/js/config.js"></script>
    <script src="./resources/src/js/storage.js"></script>
    <script src="./resources/src/js/data.js"></script>
    <script src="./resources/src/js/modal.js"></script>
    <script src="./resources/src/js/clock.js"></script>
    <script src="./resources/src/js/main.js"></script>
    <script src="./resources/src/js/ju.js"></script>
    <script src="./resources/src/js/allcheck.js"></script>
    <script src="./resources/src/js/game.js"></script>
    <script type="text/javascript">
     var allCheck = new AllCheck({
         activeClass: 'is_disable',
         activeElement: 'label',
         isActiveClass: true
     });
     </script>
</body>
</html>
