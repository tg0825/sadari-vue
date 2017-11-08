(function () {
$(function () {
    var diceType = 'one';

    // 전체인원
    var backpacker = [
        {
            name: '김동환',
            position: '대표이사',
            team: 'CEO',
            avatar: '',
        },
        {
            name: '김동철',
            position: '기술이사',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '이재군',
            position: '디자이너',
            team: 'designer',
            avatar: '',
        },
        {
            name: '박정호',
            position: 'engineer',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '하동현',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '김태민',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '김경신',
            position: 'backend',
            team: 'manager',
            avatar: '',
        },
        {
            name: '윤태건',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '최재훈',
            position: 'backend',
            team: 'scouter',
            avatar: '',
        },
        {
            name: '박우현',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '정성묵',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '김경범',
            position: 'backend',
            team: 'PR',
            avatar: '',
        },
        {
            name: '임백호',
            position: 'backend',
            team: 'CEO staff',
            avatar: '',
        },
        {
            name: '강혜지',
            position: 'backend',
            team: 'manager',
            avatar: '',
        },
        {
            name: '이원희',
            position: 'backend',
            team: 'manager',
            avatar: '',
        },
        {
            name: '김혜림',
            position: 'backend',
            team: 'scouter',
            avatar: '',
        },
        {
            name: '박희균',
            position: 'backend',
            team: 'designer',
            avatar: '',
        },
        {
            name: '조동현',
            position: 'backend',
            team: 'marketer',
            avatar: '',
        },
        {
            name: '박선재',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '강지윤',
            position: 'backend',
            team: 'scouter',
            avatar: '',
        },
        {
            name: '나정귀',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '김은아',
            position: 'backend',
            team: 'designer',
            avatar: '',
        },
        {
            name: '강예솔',
            position: 'backend',
            team: 'manager',
            avatar: '',
        },
        {
            name: '이태욱',
            position: 'backend',
            team: 'engineer',
            avatar: '',
        },
        {
            name: '나혜정',
            startDate: '20171001',
            resign: '20171001',
        },
        {
            name: '김현우',
            position: 'backend',
            team: '수출입팀',
            avatar: '',
        },
        {
            name: '김유라',
            position: 'backend',
            team: 'designer',
            avatar: '',
        },
        {
            name: '김상혜',
            position: 'backend',
            team: 'marketer',
            avatar: '',
            startDate: '20171101',
        },
        {
            name: '박인정',
            position: 'backend',
            team: 'marketer',
            avatar: '',
        },
        {
            name: '임은정',
            position: 'VMD',
            team: 'VMD',
            avatar: '',
        },
        {
            name: '이재은',
            position: 'backend',
            team: 'CEO',
            avatar: '',
            startDate: '20171201',
        },
        {
            name: '이수민',
            position: 'backend',
            team: 'CEO',
            avatar: '',
            startDate: '20171201',
        },
        {
            name: '한경구',
            position: 'backend',
            team: '',
            avatar: '',
            startDate: '20171201',
            resign: '20171110',
        },
    ];
    var originBp = backpacker.slice();

    var ju = [
        "청소기",
        "청소기",
        "대걸레",
        "대걸레",
        "마루바닥",
        "마루바닥",
        "집기딱이",
        "공기청정기",
        "유리청소",
        "딱 걸림",
    ];

    if (localStorage.bp) {
        backpacker = JSON.parse(localStorage.bp)
    }

    function joinMember(arg) {
        var now = new Date().getTime();
        var date;
        var y;
        var m;
        var d;

        function check(x) {
            if (x === '') {
                return true;
            }
            y = x.substr(0,4);
            m = x.substr(4,2);
            d = x.substr(6,2);

            m -= 1;
            date = Date.UTC(y, m, d);
            return date;
        }

        var re = arg.filter(function (v) {
            if (v.hasOwnProperty('startDate')) {
                date = check(v.startDate);

                if (now < date) {

                    return false;
                }
            }

            if (v.hasOwnProperty('resign')) {
                date = check(v.resign);

                if (now > date) {

                    return false;
                }
            }

            return true;
        });

        return re;
    }

    var clonebackpacker = backpacker.slice();
    clonebackpacker = joinMember(clonebackpacker);

    // 주번 랜더링
    (function () {
        var html = '<ul class="ju-list">';
        ju.map(function (v) {
            return html += '<li>' + v + '</li>';
        });
        html += '</ul>';
        $('.tab-item').last().find('.tab-item-result').html(html);
    }())

    // 사다리 종류
    var game = {
        one: function () {
            var tmpbackpacker = clonebackpacker.slice();
            var count = $('#onlyOne').val();
            var groupCount = 1;

            shuffle(tmpbackpacker);
            result({
                a: count,
                b: groupCount,
                c: tmpbackpacker
            });
        },
        "jo-member": function () {
            var tmpbackpacker = clonebackpacker.slice();
            var count = $('#groupMember').val() || 3;
            var groupCount = Math.ceil(tmpbackpacker.length / count);

            shuffle(tmpbackpacker);
            result({
                a: count,
                b: groupCount,
                c: tmpbackpacker
            });
        },
        "jo-team": function () {
            var tmpbackpacker = clonebackpacker.slice();
            var count = $('#groupCount').val() || 3;
            var groupCount = Math.ceil(tmpbackpacker.length / count);

            shuffle(tmpbackpacker);
            result({
                a: groupCount,
                b: count,
                c: tmpbackpacker
            });
        },
        ju: function () {
            var tmpbackpacker = clonebackpacker.slice();
            var count = ju.length || 3;
            var groupCount = Math.floor(tmpbackpacker.length / count);

            shuffle(tmpbackpacker);
            result({
                a: groupCount,
                b: count,
                c: tmpbackpacker,
                jo: true
            });
        }
    };

    // 결과 출력
    function result(data) {
        var html = '';
        var i = 0;
        var title;
        var onegroup = (data.b === 1);

        while (i < data.b) {
            title = (i + 1) + '조';
            if (data.jo) {
                title = ju[i];
            }
            var groupMember = data.c.splice(0, data.a);
            var groupMemberLength = data.jo ? 1 : groupMember.length;

            if (!groupMemberLength) {
                break;
            }
            if (onegroup) {
                html += '<div class="group item onegroup">';
            } else {
                html += '<div class="group item">';
                html += '<div class="group title">' + title + '</div>';
            }
            for (var j = 0; j < groupMemberLength; j++) {
                html += '<div class="member-list member ' + groupMember[j].team.toLowerCase() + '"' +
                ' style="background-image:url(' + groupMember[j].avatar + ')">' +
                '<span class="name">' + groupMember[j].name + '</span>' +
                '<span class="team">' + groupMember[j].team + '</span>' +
                '</div>';
            }
            html += '</div>';
            i += 1;
        }
        $('.result').html(html);
    }

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

    // 경고 문구
    function alertMsg(msg) {
        var $comment = $('<p class="f-error"></p>');
        var $parent = $(document.forms[0].name).parent();

        $parent.find('.f-error').remove();
        $comment
        .append(msg)
        .appendTo($parent)
        .delay(1000)
        .queue(function () {
            $(this).remove().dequeue();
        });
    }

    // 중복값 찾기
    function compare(arr, str) {
        var result;
        arr = arr || clonebackpacker;

        arr.some(function (e, a) {
            if (e.name === str) {
                result = {
                    name: str,
                    idx: a
                };

                return true;
            }

            return false;
        });

        return result;
    }

    // 구성원 추가
    function addMem(o, v) {
        if (v === '') {
            return;
        }
        var data = (typeof o[0] === 'string') ? v : {name: v};
        return o.push(data);
    }

    // 구성원 랜더링
    function _render(v) {
        var memberList = '';
        v = v || clonebackpacker;

        var i = 0;
        for(; i < v.length; i++) {
            if (typeof v[i].team === 'undefined') {
                v[i].team = '';
            }
            memberList += '<div class="member-list member ' + v[i].team.toLowerCase() + '"' +
            ' style="background-image:url(' + v[i].avatar + ')">' +
            '<span class="name">' + v[i].name + '</span>' +
            '<span class="team">' + v[i].team + '</span>' +
            '</div>';
        }

        $('.member-list.body').html(memberList);
        $('.member-list.number').html(v.length);

        localStorage.bp = JSON.stringify(clonebackpacker);
    }

    function renderJu(data) {
        var $body = data.body;
        var arr = data.arr;
        var length = arr.length;
        var html = '';

        var i = 0;
        for(; i < length; i++) {
            html += '<li>' + arr[i] + '</li>';
        }

        $body.html(html);
    }

    // 구성원 삭제
    function remove(o, v) {
        return o.splice(v, 1);
    }

    // 구성원 이름 수정
    function endEdit(v, i) {
        clonebackpacker[i].name = v;

        $(this)
        .removeClass('edit')
        .text('')
        .append('<span class="name">' +
        clonebackpacker[i].name +
        '</span>');
    }

    // 구성원 이름 수정 이벤트 바인딩
    $(document).on({
        click: function () {
            var self = this;
            var $self = $(self);
            var idx = $self.index();
            var oldText = $self.find('.name').text();
            var $input = $('<input maxLength="10" type="text">');

            if ($(this).is('.edit')) {
                return;
            }

            $input.val(oldText);
            $self
                .text('')
                .addClass('edit')
                .append($input)
                .find($input)
                .focus()
                .on({
                    focusout: function () {
                        var text = $(this).val();
                        endEdit.call(self, text, idx);
                    },
                    keypress: function (e) {
                        if (e.keyCode == 13) {
                            $(this).trigger('focusout');
                        }
                    }
                });
        },
        mouseenter: function () {
            $(this).find('.remove').remove();
            $(this).append('<span class="remove">x</span>');
        }
    }, '.member-list.body .member-list.member');

    // 구성원 삭제
    $(document).on('click', '.member-list.wrap .member-list.member .remove', function (e) {
        e.stopPropagation();
        var idx = $(this).parent().index();
        remove(clonebackpacker, idx);
        _render();
    });

    // 구성원 초기화
    $(document).on('click', '.reset', function () {
        if (confirm ('구성원을 초기화 시키겠습니까?')) {
            clonebackpacker = joinMember(originBp);
            localStorage.clear();
            _render(clonebackpacker);
        }
    });

    // 구성원 추가
    $('#frm').on('submit', function (e) {
        e.preventDefault();

        // 추가할 직원 이름
        var $name = $('#name');
        var name = $name.val();

        // 빈값, 중복 이름 여부 채크
        var com = compare(clonebackpacker, name);

        if (name === '') {
            alertMsg('이름을 입력해 주세요.');
            return;
        }

        if (com) {
            alertMsg('이미 등록된 이름 입니다.');
            $('.member-list.body .member')
            .eq(com.idx)
            .addClass('highlight')
            .delay(300)
            .queue( function () {
                $(this).removeClass('highlight').dequeue();
            });
            return;
        }

        addMem(clonebackpacker, name);
        _render();
        $name.val('');
    });

    $('.ju-add').find('button').on('click', function () {
        var name = $(this).prev().val();
        addMem(ju, name);
        renderJu({
            body: $('.ju-list'),
            arr: ju
        });
    });

    // 주번 삭제
    $('.ju-list').on('click', 'li', function () {
        var idx = $(this).index();
        remove(ju, idx);
        renderJu({
            body: $('.ju-list'),
            arr: ju
        });
    });

    // 사다리 시작
    $('.start').on('click', function (e) {
        game[diceType]();
        scrollMove('.dice-select');
    });

    function scrollMove(offsetElm) {
        var elm = offsetElm;
        var pos = $(elm).offset().top;

        $('body, html').animate({
            scrollTop: pos
        }, 300);
    }

    // 게임 종류 선택
    $('.dice-select').find('button').on('click', function () {
        var idx = $(this).parent().index();
        diceType = $(this).data('game');

        $('.dice-select').find('button').removeClass('is_on');
        $(this).addClass('is_on');
        $('.tab')
            .find('> [class^=tab]')
            .hide()
            .eq(idx)
            .show();
    });

    $('.dice-select').find('button:eq(0)').trigger('click');

    _render();
});
}(jQuery));
