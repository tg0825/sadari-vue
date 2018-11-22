(function (window, $, modal) {
    var storage = new Storage();
    var $wrap = $('.sadari.wrap');
    var sadariType = 'one';
    var clonebackpacker = window.clonebackpacker || {};
    var tmpbackpacker = [];
    var originBp;
    var renderText = '';
    
    // 게임 종류 리턴
    function _getGameType() {
        return sadariType;
    }
    
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

    // 구성원 데이터 구성
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
                        ' style="background-color:' + (groupMember.team_color || '#ddd') + '">' +
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

    // 주번 항목 추가
    function addJu(e) {
        var eTarget = e.currentTarget;
        var input = $(eTarget).parents('.ju-add').find('[name=name]');
        var name = input[0].value;
        var data;
        
        if (name) {
            data = (Array.isArray(ju) === true) ? name : {name: name, team: t};
            ju.push(data);
            renderJu();
            input[0].value = '';
        }

        input[0].focus();
    }
    
    // 주번 항목 삭제
    function removeJu() {
        var idx = $(this).index();
        ju.splice(idx, 1);
        
        renderJu();
    }
    
    // 주번 랜더링
    function renderJu() {
        var html = '<ul class="ju-list">';
        ju.forEach(function (v) {
            return html += '<li>' + v + '</li>';
        });
        html += '</ul>';
        $('.tab-item').last().find('.tab-item-result').html(html);
        storage.setItem('juList', ju);
    }
    
    // 주번 랜더링
    function initJu() {
        if (storage.getItem('juList')) {
            ju = storage.getItem('juList');
        } else {
            storage.setItem('juList', ju);
        }
        
        renderJu();
    }


    // 직원 토글
    function toggleMember(e) {
        e.stopPropagation();

        var $target = $(e.currentTarget);
        var $item = $target.parents('.member-list.member');
        var idx = $item.index();
        var state = null;

        if ($item.is('.is_disable')) {
            $item.removeClass('is_disable');
            state = false;
        } else {
            $item.addClass('is_disable');
            state = true;
        }

        updateState(idx, state);
        store.emit('updateMemberCount', clonebackpacker);
    }

    // 상태 업데이트
    function updateState(index, state) {
        clonebackpacker[index].is_disable = state;
    }

    // 전체 토글
    function toggleAllMember(e) {
        var state = e.currentTarget.checked;
        var $itemList = $('.member-list.body .member-list.member');
        $.each($itemList, function (i, e) {
            updateState(i, state);
        });
        store.emit('updateMemberCount', clonebackpacker);
    }

    // 게임 시작
    function startSadari() {
        tmpbackpacker = fil();
        game[sadariType]();
        store.emit('renderTextResult', resultText);
    }

    // 게임 선택
    function selectSadari() {
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

    // 데이터 초기화
    function initData() {
        var backpacker = [];

        $('.member-list.body').find('.member-list.member').each(function (i, e) {
            var $member = $(e);
            var member = {
                name: $member.find('.name').html(),
                team: $member.find('.team').html(),
                team_eng: $member.data('team-eng'),
                team_color: $member.data('team-color'),
            };

            backpacker.push(member);
        });

        // if (localStorage.bp) {
        //     backpacker = JSON.parse(localStorage.bp);
        // }

        originBp = backpacker.slice();
        clonebackpacker = joinMember(backpacker.slice());
        window.clonebackpacker = clonebackpacker;
    }

    // 이벤트 바인딩
    function bindEvent() {
        $(document)
            .on('click', '.member-list.wrap .member-list.member input:checkbox', toggleMember)
            .on('click', '.js-all-check-master', toggleAllMember)
            .on('click', '.ju-list li', removeJu);
        $('.ju-add')
            .on('click', 'button', addJu)
            .on('keypress', '#name', function (e) {
                if (e.keyCode == 13) addJu(e);
            })
        $('.sadari-select').on('click', 'button', selectSadari);
        $('.start').on('click', startSadari);
        
        store.on('getGameType', _getGameType);
    }
    
    function init() {
        bindEvent();
        initData();
        initJu();
        
        $('.sadari-select').find('button:eq(0)').trigger('click');
        store.emit('updateMemberCount', clonebackpacker);
    }
    
    init();
}(window, jQuery, modal));
