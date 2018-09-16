(function (window, $, modal) {
    var storage = new Storage();
    var $wrap = $('.sadari.wrap');
    var sadariType = 'one';
    var clonebackpacker = window.clonebackpacker || {};
    var tmpbackpacker = [];
    var originBp;
    var renderText = '';
    // 배열 랜덤 섞기
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    // 삭제
    function remove(removeArray, value) {
        return removeArray.splice(value, 1);
    }

    function fil() {
        var remap = clonebackpacker.slice().filter(function (v) {
            if (v.is_disable === true) {
                return false;
            }
            return true;
        });

        shuffle(remap);

        return remap;
    }

    // 사다리 종류
    var game = {
        one: function () {
            var count = $('#onlyOne').val();
            var groupCount = 1;

            result({
                a: count,
                b: groupCount,
                c: tmpbackpacker
            });
        },
        jo_member: function () {
            var count = $('#groupMember').val() || 3;
            var groupCount = Math.ceil(tmpbackpacker.length / count);

            result({
                a: count, // 한조 인원
                b: groupCount, // 조 수
                c: tmpbackpacker
            }, true);
        },
        jo_team: function () {
            var count = $('#groupCount').val() || 3;
            var groupCount = Math.ceil(tmpbackpacker.length / count);

            result({
                a: groupCount,
                b: count,
                c: tmpbackpacker
            });
        },
        // 주번
        ju: function () {
            var count = ju.length;
            var groupCount = Math.floor(tmpbackpacker.length / count);

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
    function result(data, restGroupType) {
        var i = 0;
        var onegroup = (data.b === 1);

        if (data.b <= 0 || data.a <= 0) {
            alert('값을 확인해주세요');
            return false;
        }

        function renderResult(data, onegroup) {
            var html = '';
            data.forEach(function (group) {
                if (onegroup) html += '<div class="group item onegroup">';
                else html += '<div class="group item"><div class="group title">' + group.title + '</div>';
                group.member.forEach(function (groupMember, memberIndex) {
                    html += '<div data-index=' + memberIndex + ' class="member-list member ' + groupMember.team_eng + '"' +
                        ' style="background-image:url(' + groupMember.avatar + ')">' +
                        '<span class="name">' + groupMember.name + '</span>' +
                        '<span class="team">' + groupMember.team + '</span>' +
                        '</div>';
                });
                html += '</div>';
            });
            return html;
        }

        var resultObj = [];
        while (i < data.b) {
            var groupData = {
                title: data.jo ? ju[i] : (i + 1) + '조',
                member: data.jo ? [data.c[i]] : data.c.splice(0, data.a)
            };

            if (restGroupType && groupData.member.length < data.a) {
                if (confirm('나머지 인원이 있습니다. 다른 조에 포함 시키겠습니까?')) {
                    groupData.member.forEach(function (v, idx) {
                        resultObj[idx].member.push(v);
                    });
                    break;
                };
            }

            resultObj.push(groupData);
            i ++;
        }

        $wrap.addClass('is_result');
        modal.open(renderResult(resultObj, onegroup));
    }

    // 결과 텍스트로 만들기
    function resultText() {
        var resultText_list = [];
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

        renderText = yyyymmdd;

        var game = '';
        switch(sadariType) {
            case 'one':
                game = '한명뽑기';
                break;
            case 'jo_member':
                game = '랜덤조';
                break;
            case 'jo_team':
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
        $('[data-sadari="result"] .group.item').each(function (i, e) {
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
                    thisCols += '\n[' + v[k] + ']\n';
                }
            }

            if (vMax !== i) {
                thisCols += '\n';
            }

            renderText += thisCols;
        });

        $('.resultText textarea').attr('rows', resultText_list.length);
        $('.resultText textarea').html(renderText);
        $('.resultText').hide();
    }

    function sendSlack(text) {
        text = text || renderText;
        var channelName = 'random';
        var token = 'KAqNxVAidiPcbZ3EixDDIPqg';
        var url = 'https://backpackr-talk.slack.com/services/hooks/slackbot?token=' + token + '&channel=' + channelName;
        var param = {
            payload: text
        };

        function success(response) {
            (response === 'ok') ? alert('전송 완료!') : '';
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
    function renderMember(v) {
        var memberList = '';
        v = v || clonebackpacker;

        var i = 0;
        for(; i < v.length; i++) {
            if (typeof v[i].team === 'undefined') {
                v[i].team = '';
            }
            memberList += '<div ' +
                'data-team-eng="' + v[i].team_eng + '"' +
                'class="member-list member ' + v[i].team_eng + '"' +
                ' style="background-image:url(' + v[i].avatar + ')">' +
                '<input type="checkbox" class="js-all-check-item"/>' +
                '<span class="name">' + v[i].name + '</span>' +
                '<span class="team">' + v[i].team + '</span>' +
                '</div>';
        }

        $('.member-list.body').html(memberList);
        headCount();

        // localStorage.bp = JSON.stringify(clonebackpacker);
    }

    // 주번 랜더링
    function renderJu($body, arr) {
        var length = arr.length;
        var html = '';
        var i = 0;
        for(; i < length; i++) html += '<li>' + arr[i] + '</li>';
        $body.html(html);
        storage.setItem('juList', arr);
    }

    // 비활성 버튼 클릭
    function memberToggle(e) {
        e.stopPropagation();
        var $target = $(e.currentTarget);
        var idx = $target.index();

        if ($target.is('.is_disable')) {
            $target.removeClass('is_disable');
            clonebackpacker[idx].is_disable = false;
        } else {
            $target.addClass('is_disable');
            clonebackpacker[idx].is_disable = true;
        }

        headCount();
    }

    function headCount() {
        var max = clonebackpacker.length;
        var disable = clonebackpacker.filter(function (v) {
            if (v.is_disable === true) {
                return true;
            }
            return false;
        });
        $('.member-list.number').html((max - disable.length) + '/' + max);
    }

    // 데이터 추가
    function addData(item, name, t) {
        var data = (Array.isArray(item) === true) ? name : {name: name, team: t};
        return item.push(data);
    }

    // 주번 항목 추가
    function addJu(e) {
        var eTarget = e.currentTarget;
        var input = $(eTarget).parents('.ju-add').find('[name=name]');
        var name = input[0].value;

        if (name) {
            addData(ju, name);
            renderJu($('.ju-list'), ju);
            input[0].value = '';
        }

        input[0].focus();
    }

    // 주번 항목 삭제
    function removeJu() {
        var idx = $(this).index();
        remove(ju, idx);
        renderJu($('.ju-list'), ju);
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
    function sadariStart() {
        tmpbackpacker = fil();
        game[sadariType]();
        resultText();
    }

    // 게임 선택
    function selectDice() {
        var idx = $(this).parent().index();
        sadariType = $(this).data('game');

        $('.sadari-select').find('button').removeClass('is_on');
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
        var result = document.querySelector('.modal');

        result.dataset.option = (result.dataset.option === option) ? '' : option;
    }

    function resultTextToggle() {
        var target = document.querySelector('.resultText');
        target.style.display = (target.style.display === 'none') ? '' : 'none';
    }

    function teamRender() {
        var bpkTeam = clonebackpacker.map(function (v) {
            return v.team_eng;
        });

        bpkTeam = bpkTeam.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });

        var html = '<div class="team root">';
        bpkTeam.forEach(function (v) {
            html += '<label class="team item ' + v + '" title="' + v + '">';
            html += '<input type="radio" name="team" required value="' + v + '" />';
            html += '</label>';
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
        var backpacker = [];

        if (storage.getItem('juList')) {
            ju = storage.getItem('juList');
        } else {
            storage.setItem('juList', ju);
        }

        $('.member-list.body').find('.member-list.member').each(function (i, e) {
            var $member = $(e);
            var member = {
                name: $member.find('.name').html(),
                team: $member.find('.team').html(),
                team_eng: $member.data('team-eng'),
            };

            backpacker.push(member);
        });

        originBp = backpacker.slice();

        // if (localStorage.bp) {
        //     backpacker = JSON.parse(localStorage.bp);
        // }

        clonebackpacker = joinMember(backpacker.slice());
        window.clonebackpacker = clonebackpacker;

        renderMember();
        // teamRender();
        juRender();

        $('.sadari-select').find('button:eq(0)').trigger('click');
    }

    function initEvent() {
        // event bind
        // $(document).on({
        //     mouseenter: hoverName
        // }, '.member-list.body .member-list.member');
        // 멤버 추가 창 토글
        // $('.toggleMenu').on('click', windowMem);
        // 멤버 추가
        // $('#JSFORM').on('submit', addMember);
        // 추가 멤버 팀 선택
        // $(document).on('click', '.team.item', selectedTeam)
        // 멤버 비활성
        $(document).on('click', '.member-list.wrap .member-list.member', memberToggle);
        // 주번 추가
        $('.ju-add')
            .on('click', 'button', addJu)
            .on('keypress', '#name', function (e) {
                if (e.keyCode == 13) addJu(e);
            })
        // 주번 삭제
        $(document).on('click', '.ju-list li', removeJu);
        // 사다리 선택
        $('.sadari-select').on('click', 'button', selectDice);
        // 사다리 시작
        $('.start').on('click', sadariStart);
        // 구성원 리셋
        // $(document).on('click', '.reset', reset);
        $(document).on('click', '[name=copy]', copy);
        // 결과 옵션
        $(document).on('click', '.option.root [data-option]', option);
        // 텍스트결과 토글
        $(document).on('click', '[data-sadari="result-toggle"]', resultTextToggle);
        // 슬랙으로 결과 보내기
        $(document).on('click', '[data-sadari="send-slack"]', function () {
            if (confirm('결과를 slack으로 전송하시겠습니까?')) {
                sendSlack();
            }
        });
    }

    initEvent();
    init();
}(window, jQuery, modal));
