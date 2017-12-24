(function (window, $, modal) {

    var diceType = 'one';
    var clonebackpacker = window.clonebackpacker || {};
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

            if (v.hasOwnProperty('resign') && v.resign) {
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
        var index = 1;
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
                html += '<div data-index=' + index + ' class="member-list member ' + groupMember[j].team.toLowerCase() + '"' +
                ' style="background-image:url(' + groupMember[j].avatar + ')">' +
                '<span class="name">' + groupMember[j].name + '</span>' +
                '<span class="team">' + groupMember[j].team + '</span>' +
                '</div>';
                index += 1;
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
        var index = 1;

        var date = new Date();
        var today = date.getDay();
        var week = ['일', '월', '화', '수', '목', '금', '토'];
        var yyyymmdd = date.getFullYear() + '년' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '월' +
        ("0" + date.getDate()).slice(-2) + '일' +
        ' (' + week[today] + ') ' +
        ("0" + date.getHours()).slice(-2) + '시' +
        ("0" + date.getMinutes()).slice(-2) + '분\n';

        renderText += yyyymmdd;

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
                        thisCols += '(' + index + ')' + v.name;
                        // thisCols += v.team;
                        if (max !== i) {
                            thisCols += ', ';
                        }
                        index += 1;
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
        if (confirm('결과를 slack으로 전송하시겠습니까?')) {
            sendSlack(renderText);
        }
    }

    function sendSlack(text) {
        var channelName = 'tg0825test';
        var token = 'KAqNxVAidiPcbZ3EixDDIPqg';
        var url = 'https://backpackr-talk.slack.com/services/hooks/slackbot?token=' + token + '&channel=' + channelName;
        var param = {
            payload: text
        };

        function success(response) {
            (response === 'ok') ? alert('배달 전송 완료!') : '';
        }

        $.post(url, param)
            .done(success);
    }

    function copy() {
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

    function windowMem(e) {
        var $this = $(e.target);
        var top = $this.offset().top;
        var left = $this.offset().left;
        $('#frm').css({
            'left': left,
            'top': top + 30
        });
        $('#frm').toggle();
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

        var $name = $('#name');
        var $team = $('.team-list');
        var name = $name.val();
        var team = $team.find('.is_active').attr('title');

        // 빈값, 중복 이름 여부 채크
        var com = compare(clonebackpacker, name);

        if (name === '') {
            alertMsg('이름을 입력해 주세요.');
            $name.focus();
            return;
        }

        if (typeof team === 'undefined') {
            alertMsg('팀을 선택해 주세요.');
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

        addData(clonebackpacker, name, team);
        _render();
        $name.val('');
    }

    // 데이터 추가
    function addData(o, v, t) {
        var data = (Array.isArray(o) === true) ? v : {name: v, team: t};
        return o.push(data);
    }

    // 주번 항목 추가
    function addJu() {
        var name = $(this).parents('.ju-add').find('[name=name]').val();
        addData(ju, name);
        renderJu({
            body: $('.ju-list'),
            arr: ju
        });
    }

    // 주번 항목 삭제
    function removeJu() {
        var idx = $(this).index();
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

    // 옵션 선택
    function option(e) {
        var target = e.target;
        var option = target.dataset.option;
        var result = document.querySelector('.result');

        result.dataset.option = (result.dataset.option === option) ? '' : option;
    }

    function resultTextToggle() {
        var target = document.querySelector('.resultText');
        target.style.display = (target.style.display === 'none') ? '' : 'none';
    }

    function teamRender() {
        var bpkTeam = clonebackpacker.map(function (v) {
            return v.team;
        })

       bpkTeam = bpkTeam.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });

        var html = '<div class="team root">';
        bpkTeam.forEach(function (v) {
            html += '<div class="team item ' + v.toLowerCase() + '" title="' + v + '"></div>';
        });
        html += '</div>';
        $('.team-list').append(html);
    }

    function selectedTeam(e) {
        var $self = $(this);
        // $self.css('color', bg);
        // $self.css('background-color', cl);
        // $self.css('border', '2px solid ' + bg + '');
        // $self.siblings().attr('style', '');

        $self.addClass('is_active').siblings().removeClass('is_active');
    }

    // 초기화
    function init() {
        originBp = backpacker.slice();

        if (localStorage.bp) {
            backpacker = JSON.parse(localStorage.bp);
        }

        clonebackpacker = joinMember(backpacker.slice());
        window.clonebackpacker = clonebackpacker;

        _render();
        teamRender();
        juRender();

        $('.dice-select').find('button:eq(0)').trigger('click');
    }

    function initEvent() {
        // event bind
        $(document).on({
            click: changeName,
            mouseenter: hoverName
        }, '.member-list.body .member-list.member');
        // 멤버 추가 창 토글
        $('.toggleMenu').on('click', windowMem);
        // 멤버 추가
        $('#frm').on('submit', addMember);
        // 추가 멤버 팀 선택
        $(document).on('click', '.team.item', selectedTeam)
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
        // 옵션
        $(document).on('click', '[data-option]', option);
        // 텍스트결과 토글
        $('.resultTextToggle').on('click', resultTextToggle)
    }

    initEvent();
    init();

    // test action
    // $('.dice-select button').eq(1).click();
    // $('.start').click();
    // $('[data-option]').click();
}(window, jQuery, modal));
