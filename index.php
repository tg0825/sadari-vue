<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="stylesheet" href="style.css">
<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<title>조 짜기</title>
</head>
<body>
    <div class="dice wrap">
        <h1 class="dice title">주사위 게임</h1>
        <div class="member-list wrap">
            <!-- <div class="member-list title">구성원</div> -->
            <div class="member-list body"> </div>
            <div class="member-list number"></div>
        </div>

        <div class="setup">
            <form action="" id="frm" autocomplete="off">
                <div class="form-block">
                    <label for="">인원 추가</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="이름을 입력해주세요."
                    maxlength="10"
                    >
                    <button type="submit" class="btn-add-mem">추가</button>
                </div>
            </form>

            <div class="form-block">
                <label for="">인원 기준</label>
                <input id="groupMember" name="groupMember" type="number" value="3">
                명
            </div>

            <div class="form-block">
                <label for="">조 기준</label>
                <input id="groupCount" name="groupCount" type="number" value="5">
                개 조
            </div>
            <button class="start" type="submit">인원수 기준 시작!</button>
            <button class="start-group" type="submit">조 기준 시작!</button>
            <button class="reset">인원 초기화</button>
        </div>

        <div class="result"> </div>
    </div>
<script src="script.js"></script>
</body>
</html>
