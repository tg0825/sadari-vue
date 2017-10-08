<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<style>
*{
    margin:0;
    padding:0;
}

.f-error {
    color: #960b0b;
    font-size: 14px;
    line-height: 16px;
}

.f-error:before {
    content: '*';
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
}

.dice.wrap {
    min-width: 320px;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
}

.dice.title {
    text-align: center;
    font-size: 24px;
}

.member-list.wrap {
    margin: 20px 0;
}

.member-list.title {
    font-size: 18px;
}

.member-list.body:after {
    clear: both;
    display: block;
    content: '';
}

.member-list.member {
    background: #eb4949;
    color: #fff;
    width: 70px;
    height: 70px;
    font-size: 16px;
    border-radius: 15px;
    text-align: center;
    line-height: 70px;;
    float: left;
    margin: 5px;
    position: relative;
    cursor: pointer;
    transform: scale(1);
    transition: all 150ms;
}

.member-list.member.highlight {
    background: #df2525;
    transform: scale(1.4);
}

.member-list.member:hover {
    background: #be3636;
}

.member-list.member:hover:after {
    content: '\2715';
    position: absolute;
    top: -5px;
    right: -5px;
    text-align: center;
    background: #333;
    border-radius: 50%;
    color: #fff;
    width: 30px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    z-index: 100;
}

.group.item {
    margin: 20px;
    float: left;
}

.group.member {
    margin: 5px 0;
}

.form-block {
    margin: 20px 0 0;
}

.start {
    width: 100%;
    height: 40px;
    background: #eb4949;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    border: 0;
    margin: 20px 0;
}

.reset {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
<title>조 짜기</title>
</head>
<body>
    <div class="dice wrap">
        <h1 class="dice title">조 짜기</h1>
        <form id="frm" action="">
            <div class="member-list wrap">
                <div class="member-list body"> </div>
            </div>

            <div class="form-block">
                <label for="">인원 추가하기</label>
                <input id="name" name="name" type="text">
                <button>추가</button>
            </div>

            <div class="form-block">
                <label for="">팀당 인원</label>
                <input id="groupMember" name="groupMember" type="number" value="3">
            </div>
        </form>

        <button class="start" type="submit">시작!</button>

        <div class="result"> </div>
        <button class="reset">초기화</button>
    </div>
<script src="script.js"></script>
</body>
</html>
