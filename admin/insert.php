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
<form id="JSFORM" action="./insert-m.php" method="post" autocomplete="off">
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
        <!-- <input type="text" placeholder="역할" name="position" value=""> -->
        <!-- <input type="text" placeholder="입사일자" name="start_date" value=""> -->
    </div>
    <div class="form-block">
        <div class="team-list"></div>
        <select class="" name="team">
            <option value="engineer">개발</option>
            <option value="designer">디자인</option>
            <option value="manager">운영</option>
            <option value="scouter">영입</option>
            <option value="PR">홍보</option>
            <option value="educator">작가교육</option>
            <option value="marketer">마케팅</option>
            <option value="trade">B2B</option>
            <option value="ceo">CEO</option>
        </select>
    </div>
    <button type="submit" class="btn-add-mem">추가</button>
</form>

    <!-- <form id="JSFORM" action="insert.php" method="post" autocomplete="off">
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
            <input type="text" placeholder="역할" name="position" value="">
            <input type="text" placeholder="입사일자" name="start_date" value="">
        </div>
        <div class="form-block">
            <div class="team-list"></div>
            <select class="" name="team">
                <option value="engineer">개발</option>
                <option value="designer">디자인</option>
                <option value="manager">운영</option>
                <option value="scouter">영입</option>
                <option value="PR">홍보</option>
                <option value="educator">작가교육</option>
                <option value="marketer">마케팅</option>
                <option value="trade">B2B</option>
                <option value="ceo">CEO</option>
            </select>
        </div>
        <button type="submit" class="btn-add-mem">추가</button>
    </form> -->

    <!-- <form class="" action="insert.php" method="post">
        <fieldset>
            추가
        </fieldset>
        <div><input type="text" required placeholder="이름" name="name" value=""></div>
        <div class="">
            <select class="" name="team">
                <option value="engineer">개발</option>
                <option value="designer">디자인</option>
                <option value="manager">운영</option>
                <option value="scouter">영입</option>
                <option value="PR">홍보</option>
                <option value="educator">작가교육</option>
                <option value="marketer">마케팅</option>
                <option value="trade">B2B</option>
                <option value="ceo">CEO</option>
            </select>
        </div>
        <div><input type="text" placeholder="역할" name="position" value=""></div>
        <div><input type="text" placeholder="입사일자" name="start_date" value=""></div>
        <div> <button type="submit" name="button">인원추가</button> </div>
    </form> -->

    <!-- <form class="" action="remove.php" method="post">
        <fieldset>
            삭제
        </fieldset>
        <div class="">
            <input type="text" required name="name" value="">
        </div>
        <div class="">
            <button type="submit" name="button">삭제</button>
        </div>
    </form> -->

    <!-- <form class="" action="update.php" method="post">
        <fieldset>
            수정
        </fieldset>
        <div><input type="text" placeholder="이름" name="name" value=""></div>
        <div> <button type="submit" name="button">수정</button> </div>
    </form> -->
</body>
</html>
