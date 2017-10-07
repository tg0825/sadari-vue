<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<script src="https://unpkg.com/jquery@1.12.4/dist/jquery.js"></script>
<style>
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

.member-list.body {
    overflow: hidden;
}

.member-list.member {
    background: #eb4949;
    color: #fff;
    width: 70px;
    height: 70px;
    font-size: 16px;
    border-radius: 50%;
    text-align: center;
    line-height: 70px;;
    float: left;
    margin: 5px;
    position: relative;
}

.member-list.member:hover:after {
    content: '삭제';
    position: absolute;
    top: -5px;
    right: -5px;
    text-align: center;
    background: #000;
    border-radius: 50%;
    color: #fff;
    width: 35px;
    height: 35px;
    font-size: 16px;
    line-height: 35px;
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
        <h1 class="dice title">랜덤 조짜기</h1>
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
<script>
$(function () {
    // 팀당 인원
    var memberNumber = 3;

    // 전체인원
    var backpacker = [
        {
            name: '김동완'
        },
        {
            name: '김동철'
        },
        {
            name: '하동현'
        },
        {
            name: '이재군'
        },
        {
            name: '박정호'
        },
        {
            name: '김경신',
        },
        {
            name: '넘버식스'
        },
        {
            name: '최재훈'
        },
        {
            name: '윤태건'
        },
        {
            name: '정성묵'
        },
        {
            name: '박우현'
        }
    ];

    var originBackpacker = backpacker.slice();

    // 배열 섞기
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    // resultRender
    function resultRender(m, g) {
        var html = '';
        var i = 0;
        var clonebackpacker = backpacker.slice();
        while (i < g) {
            var groupMember = clonebackpacker.splice(0, m);

            html += '<div class="group item"><div class="group title">[' + i + '조]</div>';
            for (var j = 0; j < groupMember.length; j++) {
                html += '<div class="group member">' + groupMember[j].name + '</div>';
            }
            html += '</div>';
            i+=1;
        }
        $('.result').html(html);
    }

    document.querySelector('.start').addEventListener('click', function () {
        shuffle(backpacker);

        // 한 조당 인원 수
        memberNumber = $('#groupMember').val();

        // 그룹 수
        var groupNumber = Math.ceil(backpacker.length / memberNumber);

        resultRender(memberNumber, groupNumber);
    });

    function addMem(v) {
        backpacker.push({
            name: v
        });
    }

    function setMember(v) {
        var memberList = '';
        v = v || backpacker;
        for(var i = 0; i < v.length; i++) {
            memberList += '<div class="member-list member">' + v[i].name + '</div>';
        }
        $('.member-list.body').html(memberList);
    }

    function remove(v) {
        backpacker.splice(v, 1);
    }

    $(document).on('click', '.member-list.member', function () {
        var idx = $(this).index();
        remove(idx);
        setMember();
    });

    $(document).on('click', '.reset', function () {
        backpacker = originBackpacker.slice();
        setMember(originBackpacker);
    });

    $('#frm').on('submit', function (e) {
        e.preventDefault();

        // 직원 이름
        var name;

        name = $('#name').val();
        $('#name').val('');

        addMem(name);
        setMember();
    });


    setMember();
});
</script>
</body>
</html>
