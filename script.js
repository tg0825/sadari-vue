(function () {
$(function () {
    var diceType = 'one';

    // 전체인원
    var backpacker = [
        {
            name: '김동환',
            position: '대표이사',
        },
        {
            name: '김동철',
            position: '기술이사',
        },
        {
            name: '이재군',
            position: '디자이너'
        },
        {
            name: '박정호',
            position: '안드로이드'
        },
        {
            name: '하동현',
            position: 'backend'
        },
        {
            name: '김태민',
            position: '넘버식스',
        },
        {
            name: '김경신',
            position: '자메이카',
        },
        {
            name: '윤태건',
            position: 'tg0825',
        },
        {
            name: '최재훈',
            position: '작가영입'
        },
        {
            name: '박우현',
            position: '개발팀'
        },
        {
            name: '정성묵'
        },
        {
            name: '김경범'
        },
        {
            name: '임백호'
        },
        {
            name: '강혜지'
        },
        {
            name: '이원희'
        },
        {
            name: '김혜림'
        },
        {
            name: '박희균'
        },
        {
            name: '조동현'
        },
        {
            name: '박선재'
        },
        {
            name: '강지윤'
        },
        {
            name: '나정귀'
        },
        {
            name: '김은아'
        },
        {
            name: '강예솔'
        },
        {
            name: '이태욱'
        },
        // {
        //     name: '나혜정',
        //     date: '20171131'
        // },
        {
            name: '김현우'
        },
        {
            name: '김유라'
        },
        {
            name: '김상혜'
        },
        {
            name: '박인정'
        },
        {
            name: '허수정'
        },
        {
            name: '임은정'
        },
        {
            name: '이재은'
        },
        {
            name: '이수민'
        },
        {
            name: '한경구'
        },
    ];

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

    var clonebackpacker = backpacker.slice();

    // 주번 자동 랜더링
    (function () {
        var html = '<ul class="ju-list">';
        ju.map(function (v) {
            return html += '<li>' + v + '</li>';
        });
        html += '</ul>';
        $('.tab-item').last().find('.tab-item-result').html(html);
    }())

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
                html += '<div class="group member"><span class="name">' +
                groupMember[j].name +
                '</span></div>';
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

        for(var i = 0; i < v.length; i++) {
            memberList += '<div class="member-list member">' +
            '<span class="name">' +
            v[i].name +
            '</span></div>';
        }

        $('.member-list.body').html(memberList);
        $('.member-list.number').html(v.length);
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
        console.log(arr);
    }

    // 구성원 삭제
    function remove(o, v) {
        return o.splice(v, 1);
    }
    // function remove(v) {
    //     clonebackpacker.splice(v, 1);
    //
    //     _render();
    // }

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
    }, '.member-list.member');

    // 구성원 삭제
    $(document).on('click', '.member-list.member .remove', function (e) {
        e.stopPropagation();
        var idx = $(this).parent().index();
        remove(clonebackpacker, idx);
        _render();
    });

    // 구성원 초기화
    $(document).on('click', '.reset', function () {
        if (confirm ('구성원을 초기화 시키겠습니까?')) {
            _render(backpacker);
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
    $('.start').on('click', function () {
        game[diceType]();
    });

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
