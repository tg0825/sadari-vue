(function ($, modal) {

    var diceType = 'one';
    var clonebackpacker;
    var originBp;

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

    // 현재 인원으로만 추리기
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
        $('.resultText').show(html);
        // modal.open(html);
        resultText();
    }

    // 결과 텍스트로 만들기
    function resultText() {
        var resultText_list = [];
        var renderText = '';
        var cols = [];

        var game = '';
        switch(diceType) {
            case 'one':
                game = '한명뽑기';
                break;
            case 'jo-member':
                game = '랜덤조';
                break;
            case 'jo-team':
                game = '랜덤조';
                break;
            case 'ju':
                game = '주번뽑기';
                break;
            default:
                game = '한명뽑기'
        }

        // renderText += game + Date.UTC() + '\n';
        renderText += game + '\n';

        // 데이터 만들기
        $('.result .group.item').each(function (i, e) {
        // $('.modal .group.item').each(function (i, e) {
            var obj = {};
            obj.group = $(e).find('.group.title').text();
            obj.member = [];

            $(e).find('.member-list.member').each(function (i, e) {
                var member = {}
                member.name = $(e).find('.name').text();
                member.team = $(e).find('.team').text();
                obj.member.push(member);
            });
            resultText_list.push(obj);
        });

        // 데이터 출력
        resultText_list.forEach(function (v, i, a) {
            var vMax = a.length - 1;
            var thisCols = '';

            for(var k in v) {
                if (Array.isArray(v[k])) {
                    var max = v[k].length - 1;
                    v[k].forEach(function (v, i, a) {
                        thisCols += v.name;
                        // thisCols += v.team;
                        if (max !== i) {
                            thisCols += ', ';
                        }
                    });
                    continue;
                }

                if (v[k] !== '') {
                    thisCols += '[' + v[k] + ']\n';
                }
            }

            if (vMax !== i) {
                thisCols += '\n';
            }

            renderText += thisCols;
        });
        $('.resultText textarea').attr('rows', resultText_list.length);
        $('.resultText textarea').html(renderText);
        // console.log(renderText);
    }

    // <button onclick="myFunction()">Copy text</button>
    function copy(e) {
        $('.resultText textarea')[0].select();
        if (document.execCommand("Copy")) {
            alert('복사 완료!');
        }
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

    // 주번 랜더링
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

    // 이름 변경
    function changeName() {
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
    }

    // 삭제 버튼 보이기
    function hoverName() {
        $(this).find('.remove').remove();
        $(this).append('<span class="remove">x</span>');
    }

    // 삭제 버튼 클릭
    function clickRemove(e) {
        e.stopPropagation();
        var idx = $(this).parent().index();
        remove(clonebackpacker, idx);
        _render();
    }

    // 구성원 초기화
    function reset() {
        if (confirm ('구성원을 초기화 시키겠습니까?')) {
            clonebackpacker = joinMember(originBp);
            localStorage.clear();
            _render(clonebackpacker);
        }
    }

    // 구성원 추가
    function addMember(e) {
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
    }

    // 주번 항목 추가
    function addJu() {
        var name = $(this).prev().val();
        addMem(ju, name);
        renderJu({
            body: $('.ju-list'),
            arr: ju
        });
    }

    // 주번 항목 삭제
    function removeJu() {
        var idx = $(this).index();
        console.log(1);
        remove(ju, idx);
        renderJu({
            body: $('.ju-list'),
            arr: ju
        });
    }

    // 주번 랜더링
    function juRender() {
        var html = '<ul class="ju-list">';
        ju.forEach(function (v) {
            return html += '<li>' + v + '</li>';
        });
        html += '</ul>';
        $('.tab-item').last().find('.tab-item-result').html(html);
    }

    // 게임 시작
    function diceStart() {
        game[diceType]();
        scrollMove('.dice-select');
    }

    // 스크롤 이동
    function scrollMove(offsetElm) {
        var elm = offsetElm;
        var pos = $(elm).offset().top;

        $('body, html').animate({
            scrollTop: pos
        }, 300);
    }

    // 게임 선택
    function selectDice() {
        var idx = $(this).parent().index();
        diceType = $(this).data('game');

        $('.dice-select').find('button').removeClass('is_on');
        $(this).addClass('is_on');
        $('.tab')
            .find('> [class^=tab]')
            .hide()
            .eq(idx)
            .show();
    }

    // 초기화
    function init() {
        originBp = backpacker.slice();

        if (localStorage.bp) {
            backpacker = JSON.parse(localStorage.bp);
        }

        clonebackpacker = backpacker.slice();
        clonebackpacker = joinMember(clonebackpacker);

        _render();
        juRender();

        $('.dice-select').find('button:eq(0)').trigger('click');
    }

    function initEvent() {
        // event bind
        $(document).on({
            click: changeName,
            mouseenter: hoverName
        }, '.member-list.body .member-list.member');
        // 멤버 추가
        $('#frm').on('submit', addMember);
        // 멤버 삭제
        $(document).on('click', '.member-list.wrap .member-list.member .remove', clickRemove);
        // 주번 추가
        $('.ju-add').on('click', 'button', addJu);
        // 주번 삭제
        $(document).on('click', '.ju-list li', removeJu);
        // 사다리 선택
        $('.dice-select').on('click', 'button', selectDice);
        // 사다리 시작
        $('.start').on('click', diceStart);
        // 구성원 리셋
        $(document).on('click', '.reset', reset);
        $(document).on('click', '[name=copy]', copy);
    }

    initEvent();
    init();

    // test action
    // $('.dice-select button').eq(1).click();
    // $('.start').click();
}(jQuery, modal));
