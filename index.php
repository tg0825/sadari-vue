<!DOCTYPE html>
<html lang="en">
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
        <div class="member-list wrap">
            <div class="member-list title">구성원</div>
            <div class="member-list body"> </div>
            <div class="member-list number"></div>
        </div>

        <div class="setup">
            <h1 class="dice title">주사위 게임</h1>
            <form id="frm" action="">
                <div class="form-block">
                    <label for="">인원 추가</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="이름을 입력해주세요."
                    >
                    <button>추가</button>
                </div>

                <div class="form-block">
                    <label for="">한팀 인원</label>
                    <input id="groupMember" name="groupMember" type="number" value="3">
                </div>
            </form>
            <button class="start" type="submit">시작!</button>
            <button class="reset">구성원 초기화</button>
        </div>

        <div class="result"> </div>
    </div>
<script src="script.js"></script>
</body>
</html>
