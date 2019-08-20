// initialize
(function(sd) {
    sd.JQ = {
        DOC: $(document),
        BODY: $('body')
    };
})((window.sd = window.sd || {}));

var backpacker = [];
var ju = [];
// var ju = [
//     "청소기",
//     "대걸레",
//     "마루바닥",
//     "집기닦이",
//     "공기청정기",
//     "유리청소",
//     "전등",
// ];

// 한글 명칭 추가
backpacker = (function (bp) {
    var ko = {
        ceo: '대표이사',
        designer: '디자이너',
        engineer: '개발자',
        trade: 'B2B',
        scouter: '작가영입',
        manager: '운영',
        educator: '작가교육',
        marketer: '마케팅',
        pr: '홍보',
    }
    
    bp = bp.map(function (v, i, a) {
        var t = '' + v.team;
        t = t.toLowerCase();

        if (typeof t === 'undefined') {
            return
        }

        for (var k in ko) {
            var re = new RegExp(k, 'g');
            var res = t.match(re);

            if (Array.isArray(res)) {
                v.ko = ko[k];
                break;
            }
        }
        return v;
    });

    return bp;
}(backpacker));


sd.tmpl = {
    member: function(data) {
        var is_disable = data.is_disable ? 'is_disable' : '';

        var member = `<label
            class="member-list member ${is_disable}"
            style="background-color:${data.team_color}"
            data-member-id="${data.id}"
            data-team-eng="${data.team_eng}"
            data-team-color="${data.team_color}"
            >
            <input type="checkbox" class="js-all-check-item"/>
            <span class="name">${data.name}</span>
            <span class="team">${data.team}</span>
            <span class="position">${data.position}</span>
        </label>`;
        return member;
    }
};

/**
 * 로컬스토리지 입출력 함수
 * @constructor
 */
function Storage() {
    this.getItem = function (name) {
        try {
            return JSON.parse(window.localStorage.getItem(name));
        } catch (e) {
            alert('error');
            return;
        }
    }
    this.setItem = function (name, value) {
        try {
            window.localStorage.setItem(name, JSON.stringify(value));
        } catch (e) {
            alert('error');
            return;
        }
    }
}
// pubsub
var store = {
    events: {},
    on: function (evt, fn) {
        this.events[evt] = this.events[evt] || [];
        this.events[evt].push(fn);
        
        return this;
    },
    offForceArray: function (eventArray) {
        var self = this;

        try {
            if (!Array.isArray(eventArray)) throw new Error('배열을 입력해주세요.');
            eventArray.forEach(function (evt, i) {
                if (self.events.hasOwnProperty(evt)) {
                    delete self.events[evt];
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
    off: function (evt, fn) {
        if (this.events[evt]) {
            var i = 0;
            for (; i < this.events[evt].length; i++) {
                if (this.events[evt][i] === fn) {
                    this.events[evt].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (evt, data) {
        var obj = [];
        if (this.events[evt]) {
            this.events[evt].forEach(function (fn) {
                obj.push(fn(data));
            });
        }
        return obj;
    }
};

// 결과 출력 관련
(function () {
    // 결과 텍스트
    var renderText = '';

    // jquery dom resultText
    var $resultText = $('.resultText');
    
    // jquery dom textarea
    var $textarea = $resultText.find('textarea');
    
    // 게임 명칭 리스트
    var game = {
        one: '한명뽑기',
        jo_member: '랜덤조',
        jo_team: '랜덤조',
        ju: '주번뽑기',
    };
        
    // 텍스트결과 토글
    function toggleResultText() {
        var target = $resultText[0];
        target.style.display = (target.style.display === 'none') ? '' : 'none';
    }
        
    // 결과 복사
    function copy() {
        var msg = '복사 실패';
        var domTextarea = $textarea[0];
        
        if (!domTextarea.value) return false;
        
        domTextarea.select();
        
        if (document.execCommand("Copy")) {
            msg = '복사 성공!';
        }
        
        alert(msg);
    }
    
    // 오늘 날짜 반환
    function getDate() {
        var date = new Date();
        var today = date.getDay();
        var week = ['일', '월', '화', '수', '목', '금', '토'];
        var yyyymmdd = date.getFullYear() + '년' +
            ("0" + (date.getMonth() + 1)).slice(-2) + '월' +
            ("0" + date.getDate()).slice(-2) + '일' +
            ' (' + week[today] + ') ' +
            ("0" + date.getHours()).slice(-2) + '시' +
            ("0" + date.getMinutes()).slice(-2) + '분\n';

        return yyyymmdd;
    }

    // 결과 텍스트로 만들기
    function resultText() {
        // 사다리 종류
        var _sadariType = store.emit('getGameType')[0];
        
        // 결과
        var resultText_list = [];
        
        // 조 번호
        var teamNumber = 1;

        renderText = getDate();
        renderText += game[_sadariType] + '\n';

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

        // 텍스트 가공
        resultText_list.forEach(function (v, i, a) {
            var vMax = a.length - 1;
            var thisCols = '';

            for(var k in v) {
                if (Array.isArray(v[k])) {
                    var max = v[k].length - 1;
                    v[k].forEach(function (v, i, a) {
                        thisCols += '(' + teamNumber + ')' + v.name;
                        // thisCols += v.team;
                        if (max !== i) {
                            thisCols += ', ';
                        }
                        teamNumber += 1;
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

        $textarea
            .attr('rows', resultText_list.length)
            .html(renderText);
        $resultText.hide();
    }

    // bind Event
    store
        .on('renderTextResult', resultText)
        .on('getRenderText', function () {
            return renderText;
        });
    $(document)
        .on('click', '[name=copy]', copy)
        .on('click', '[data-sadari="result-toggle"]', toggleResultText);
}());

// 슬랙으로 결과 보내기
function sendSlack(text) {
    var text = store.emit('getRenderText')[0];
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

$(document).on('click', '[data-sadari="send-slack"]', function () {
    if (confirm('결과를 slack으로 전송하시겠습니까?')) {
        sendSlack();
    }
});

// 인원 카운트
(function () {
    var $memberListNumber = $('.member-list.number');
    
    function renderMemberCount(member) {
        var max = member.length;
        var disable = member.filter(function (v) {
            if (v.is_disable === true) {
                return true;
            }
            return false;
        });
        
        $memberListNumber.html((max - disable.length) + '/' + max);
    }
    
    store.on('updateMemberCount', renderMemberCount);
})();

/**
 * modal
 */
var modal = (function(window, document, $) {
    var $modal = $('<div class="modal"></div>');
    var $modalMask = $('<div class="modal-mask"></div>');
    var $modalBox = $('<div class="modal-box"></div>');
    var $modalHead = $('<div class="modal-head"></div>');
    var $modalBody = $('<div data-sadari="result" class="modal-body"></div>');
    var $modalClose = $(
        '<button class="modal-close" type="button"><i class="fa fa-times" aria-hidden="true"></i></div>'
    );
    var optionNumber =
        '<div class="option root">' +
        '<button data-sadari="send-slack" type="button" class="option item"><i class="fa fa-slack" aria-hidden="true"></i> slack</button>' +
        '<label class="option item">' +
        '<input type="checkbox" data-option="number">' +
        ' 번호 표시 </label>' +
        '</div>';

    $modal.append($modalMask, $modalBox);
    $modalBox.append($modalHead, $modalBody, $modalClose);

    function open(content, title) {
        title = title || '결과';
        $modalHead.empty().append(title, $(optionNumber));
        $modalBody.empty().append(content);
        $modal.appendTo(sd.JQ.BODY);
    }

    function close() {
        if (confirm('결과창을 닫으시겠습니까?')) {
            $modal.attr('data-option', '').remove();
        }
    }

    function _handleKeyup(e) {
        if (sd.JQ.DOC.find('.modal').length && e.which == 27) {
            close();
        }
    }

    sd.JQ.DOC.on('click', '.modal-mask, .modal-close', close).on(
        'keyup',
        _handleKeyup
    );

    return {
        open: open,
        close: close
    };
})(window, document, jQuery);

function Clock(elm) {
    this.elm = document.querySelector(elm) || '';
    this.week = ['일', '월', '화', '수', '아직 목', '불금', '토'];

    this.run = function() {
        function start() {
            var date = new Date();
            var today = date.getDay();
            var yyyymmdd =
                '<span class="date">' +
                date.getFullYear() +
                '년' +
                ('0' + (date.getMonth() + 1)).slice(-2) +
                '월' +
                ('0' + date.getDate()).slice(-2) +
                '일' +
                ' (' +
                this.week[today] +
                ')</span>' +
                '<span class="time">' +
                ('0' + date.getHours()).slice(-2) +
                '시' +
                ('0' + date.getMinutes()).slice(-2) +
                '분' +
                '</span>';

            this.elm.innerHTML = yyyymmdd;
        }
        start.call(this);
        setInterval(start.bind(this), 1000);
    };
}

var clock = new Clock('.clock');

clock.run();

// 항목추가
var storage = new Storage();

// 아이템 추가 삭제 출력 ui
function itemListUi(rootUi) {
    var $rootUi = $(rootUi);
    var storageId = $rootUi.attr('data-tab-id');
    var ju = storage.getItem(storageId) || [];
    
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
        var icon = '';
        
        if (storageId === 'son') {
            icon = '<i class="fa fa-gift" aria-hidden="true"></i> ';
        }
        
        ju.forEach(function (v) {
            
            return html += '<li>' + icon + v + '</li>';
        });
        html += '</ul>';
        
        $rootUi.find('.tab-item-result').html(html);
        
        if (storageId) {
            storage.setItem(storageId, ju);
        }
    }
    
    function getJu() {
        return ju;
    }

    // 주번 랜더링
    function initJu(ui) {
        if (storageId && !ju) {
            storage.setItem(storageId, ju);
        }
        
        renderJu();
    }
        
    function _handleKeypressAdd(e) {
        if (e.keyCode == 13) addJu(e);
    }
        
    $rootUi
        .on('click', '.ju-add button', addJu)
        .on('keypress', '.ju-add #name', _handleKeypressAdd)
        .on('click', '.ju-list li', removeJu);
    
    store.on('getJu-' + storageId, getJu);
        
    initJu();
}

(function () {
    $('.js-tab-ju').each(function () {
        itemListUi(this);
    });
}())

// 멤버 빠른 검색
function quickSearch() {
    // 현재 인풋 값
    var inputValue;

    // 직원 리스트
    var memberList = store.emit('getAllMemberList')[0];

    // 매칭된 index 리스트
    var matchData = [];

    // jquery dom search input
    var $search = $('.search');

    // jquery dom search result
    var $result = $('.search-result');

    // 결과 랜더링
    function renderSearch() {
        var html = '';
        matchData.forEach(function(data) {
            html += sd.tmpl.member(data);
        });
        $result.html(html);
    }

    // 매칭 맴버 데이터 업데이트
    function updateSearchMemberList() {
        matchData = [];

        $.each(memberList, function(index, member) {
            if (member.name.indexOf(inputValue) > -1) {
                matchData.push(member);
            }
        });
    }

    // 결과 초기화
    function clearResult() {
        matchData = [];
        $result.empty();
    }

    // 유저 선택 (클릭) 핸들러
    function _handleChange(e) {
        try {
            var $parent = $(e.currentTarget.parentNode);
            var id = $parent.attr('data-member-id');
            var index = store.emit('findIndexById', id)[0];

            store.emit('selectUser', index);
        } catch (e) {
            console.log(e);
        }
    }

    // 유저 선택 (엔터) 핸들러)
    function _handleEnter(e) {
        if (e.target.value && e.keyCode === 13) {
            var childLength = $result.children().length;
            var $target = $result.children().eq(0);
            var id = $target.attr('data-member-id');
            var index = store.emit('findIndexById', id)[0];

            if (childLength > 1) return false;

            store.emit('selectUser', index);
        }
    }

    // 키 이벤트 핸들러
    function _handleKeyup(e) {
        inputValue = e.target.value;

        if (e.keyCode === 13) {
            return false;
        }

        // 값이 비어있을 때 결과 비우기
        if (!inputValue) {
            clearResult();
            return false;
        }

        updateSearchMemberList();
        store.emit('renderSearch');
    }

    // 바인드 이벤트
    function _bindEvent() {
        $search.on('keyup', _handleKeyup).on('keypress', _handleEnter);
        $result.on('change', '.js-all-check-item', _handleChange);
        store.on('renderSearch', renderSearch);
    }

    // 초기화
    function init() {
        _bindEvent();
    }

    init();
}

// 랜덤 대상
function randomTarget() {
    var $root = $('.sort');
    var $result = $root.find('.sort-list');
    var $btn = $('.js-split-view');

    // 유저 선택
    function _handleChange(e) {
        var $target = $(e.currentTarget.parentNode);
        var id = $target.attr('data-member-id');
        var index = store.emit('findIndexById', id)[0];

        store.emit('selectUser', index);
    }

    // 데이터 최신화 및 랜더링
    function render() {
        var memberList = store.emit('getAllMemberList')[0];
        var html = [];
        var enableList = [];
        var disableList = [];
        var elmList = [
            $('<div>', { class: 'enable-list' }),
            $('<div>', { class: 'disable-list' })
        ];

        // 기존 객체에 영향 없도록 깊은 복사
        memberList = $.extend(true, [], memberList);
        // 가나다 순 정렬
        memberList.sort(function(a, b) {
            // 오름차순
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        $.each(memberList, function(index, member) {
            var list = enableList;

            if (member.is_disable) {
                list = disableList;
            }

            list.push(member);
        });

        [enableList, disableList].forEach(function(state, index) {
            state.forEach(function(data) {
                if (!html[index]) html[index] = '';
                html[index] += sd.tmpl.member(data);
            });

            elmList[index].html(html[index]);
        });

        $result.empty().append(elmList);
    }

    function _handleClickBtn(e) {
        if ($root.is(':visible')) {
            _hide();
        } else {
            $root.show();
        }
    }

    function _hide() {
        $root.hide();
    }

    // 바인드 이벤트
    function _bindEvent() {
        $result.on('change', '.js-all-check-item', _handleChange);
        $btn.on('click', _handleClickBtn);
        store.on('renderSplit', render);
        store.on('randomTargetHide', _hide);
    }

    // 초기화
    function init() {
        _bindEvent();
        render();
    }

    init();
}

(function(window, $, modal) {
    // api 저장
    var apiCommit = '/game/insert';

    // 사다리 종류
    var sadariType = 'one';

    // 현재 선택된 게임 타입
    var selectedGameType = null;

    // 최초 순수 구성원
    var _backupInitMember;

    // 필터 적용 된 구성원
    var filterbackpackr;

    // 랜덤 적용 된 구성원
    var randombackpackr = [];

    // 결과값 저장 임시 공간
    var temp;

    // 최종 결과 데이타 (모달 출력 데이터)
    var lastResult;

    // cssClass 제외된 유저
    var disableClass = 'is_disable';

    // jquery dom member body
    var $memberBody = $('.member-list.body');

    // jquery dom member list
    var $memberList;

    // jquery dom
    var $wrap = $('.sadari.wrap');

    // 사다리 종류
    var game = {
        // 카운트 조회
        getValue: function(selector) {
            var value = $(selector).val();
            return value;
        },
        // 한명 뽑기
        one: function() {
            var count = this.getValue('#onlyOne');
            var groupCount = 1;
            var data = {
                a: count, // 출력 인원
                b: groupCount, // 그룹 수
                c: randombackpackr // 선택 되지 않은 인원
            };

            result(data);
        },
        jo_member: function() {
            var count = this.getValue('#groupMember') || 3;
            var groupCount = Math.ceil(randombackpackr.length / count);
            var data = {
                a: count, // 한조 인원
                b: groupCount, // 그룹 수
                c: randombackpackr // 랜덤 값
            };

            result(data, true);
        },
        jo_team: function() {
            var count = this.getValue('#groupCount') || 3;
            var groupCount = Math.ceil(randombackpackr.length / count);
            var data = {
                a: groupCount, // 한조 인원
                b: count, // 그룹 수
                c: randombackpackr // 랜덤 값
            };

            result(data);
        },
        // 주번, 손
        ju: function() {
            var count = 1; // 임의값
            var groupCount = ju.length;
            var data = {
                a: count,
                b: groupCount, // 청소 종류
                c: randombackpackr,
                jo_name_ju: true // 조 이름 주번 이름으로 사용
            };

            result(data);
        },
        // 랜덤점심
        jo_lunch: function() {
            var groupCount = this.getValue('#groupCount');
            var groupMemberCount = Math.ceil(
                randombackpackr.length / groupCount
            );
            var data = {
                groupCount: groupCount
            };

            // 유효성 검사
            if (randombackpackr.length == 0 || !groupCount || groupCount == 0) {
                alert('값을 확인해주세요.');
                return;
            }

            resultLunch(data);
        }
    };

    // id로 멤버 인덱스 구하기
    function findIndexById(id) {
        var index = $('.member-list.body')
            .find('.member-list.member[data-member-id="' + id + '"]')
            .index();

        return index;
    }

    /**
     * 필터링 적용된 맴버에 한해 랜덤 적용
     * @return {array}
     */
    function filterDisableMember() {
        var remap = filterbackpackr.slice().filter(function(v) {
            // 비활성 멤버 제외
            if (v.is_disable) {
                return false;
            }
            return true;
        });

        var j; // 임의의 수
        var x; // 임시 저장 공간
        var i; // 인원 수 (1씩 감소 됨)

        for (i = remap.length; i; i--) {
            j = Math.floor(Math.random() * i); // 요기가 핵심
            x = remap[i - 1]; // 마지막 직원을 임시 공간에 보냄
            remap[i - 1] = remap[j]; // 마지막 직원 자리에 임의의 번호 직원이 대입됨
            remap[j] = x; // 임의의 직원 있던 위치에 마지막 직원이 대입 됨
            // 직원 수 만큼 반복
        }

        randombackpackr = remap;
        return true;
    }

    // 퇴사한 사람, 출근 전 사람 제외
    function filterWorkMember(memberList) {
        var now = new Date().getTime();
        var date;
        var y;
        var m;
        var d;

        function check(x) {
            if (x === '') {
                return true;
            }
            y = x.substr(0, 4);
            m = x.substr(4, 2);
            d = x.substr(6, 2);

            m -= 1;
            date = Date.UTC(y, m, d);
            return date;
        }

        var re = memberList.filter(function(v) {
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

    // 결과 html 제작
    function renderHtml(data, onegroup) {
        var html = '';
        try {
            data.forEach(function(group) {
                if (onegroup) {
                    html += '<div class="group item onegroup">';
                } else {
                    html +=
                        '<div class="group item"><div class="group title">' +
                        group.title +
                        '</div>';
                }

                group.member.forEach(function(member, memberIndex) {
                    html += sd.tmpl.member(member);
                });

                html += '</div>';
            });
        } catch (e) {
            console.log(e);
        }
        return html;
    }

    // 점심 전용 결과 출력
    function resultLunch(data) {
        var list = [];

        // 팀별 직원 정렬
        $.each(randombackpackr, function(index, memberObj) {
            // 팀 존재 유무
            var isTeamExist = false;

            // 현재 팀 이름
            var thisTeam = memberObj.team;

            // list 배열에 현재 팀 이름 존재 유무 반환
            $.each(list, function(index, team) {
                if (team.teamName === thisTeam) {
                    isTeamExist = true;

                    // break;
                    return false;
                }
            });

            // list 배열에 팀이 없으면 팀을 추가
            if (!isTeamExist) {
                list.push({
                    teamName: memberObj.team,
                    teamMember: []
                });
            }

            // 변경 된 list 배열을 돌면서 팀
            $.each(list, function(index, team) {
                if (team.teamName === thisTeam) {
                    list[index].teamMember.push(memberObj);

                    // break;
                    return false;
                }
            });
        });

        // 팀별 리스트에서 멤버만 추출
        var memberListList = (function() {
            return list.map(function(teamObj, index) {
                return teamObj.teamMember;
            });
        })();

        // 팀별 배열 하나로 병합
        var memberStack = [];
        $.each(memberListList, function(index, memberList) {
            memberStack = memberStack.concat(memberList);
        });

        // 모든 인원 루프 돌면서 해당 index에 푸시
        var orderByGroup = [];
        var i = 0;
        $.each(memberStack, function(index, member) {
            if (i == data.groupCount) {
                i = 0;
            }

            if (!orderByGroup[i]) {
                orderByGroup.push({
                    title: i + 1 + '조',
                    member: []
                });
            }

            orderByGroup[i].member.push(member);
            i += 1;
        });

        $wrap.addClass('is_result');
        modal.open(renderHtml(orderByGroup));

        _gameResultCommit();
    }

    /**
     * 결과 출력
     * @param {object} data 그룹 데이터
     * a 한 그룹의 인원
     * b 그룹 수
     * c 램덤 인원
     * @param {bool} restGroupType 남은 그룹 방식
     * @return void
     */
    function result(data, restGroupType) {
        temp = $.extend(true, {}, data);

        var i = 0;
        var onegroup = data.b === 1;
        var resultObj = [];
        var msg;

        // 주번(손) 일 경우 onegroup 옵션 사용 안함
        if (data.jo_name_ju) {
            onegroup = false;
        }

        try {
            if (data.b <= 0 || data.a <= 0 || data.c.length === 0) {
                msg = '값을 확인해주세요.';
                alert(msg);
                throw new Error(msg);
            }

            // 그룹 수 만큼 반복
            while (i < data.b) {
                var groupData = {
                    title: data.jo_name_ju ? ju[i] : i + 1 + '조',
                    member: data.jo_name_ju
                        ? [data.c[i]]
                        : data.c.splice(0, data.a)
                };

                if (restGroupType && groupData.member.length < data.a) {
                    if (
                        confirm(
                            '나머지 인원이 있습니다. 다른 조에 포함 시키겠습니까?'
                        )
                    ) {
                        groupData.member.forEach(function(v, idx) {
                            resultObj[idx].member.push(v);
                        });
                        break;
                    }
                }

                resultObj.push(groupData);
                i++;
            }

            lastResult = $.extend(true, {}, resultObj);

            $wrap.addClass('is_result');
            modal.open(renderHtml(resultObj, onegroup));

            _gameResultCommit();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 상태 업데이트
     * @param {jquery dom object} $member 멤버 엘리먼트
     * @param {Boolean} isDisabled 비활성 유무
     * @return void;
     */
    function updateMemberState($member, isDisabled) {
        try {
            var index = $member.index();

            // 제외
            if (isDisabled) {
                $member.addClass(disableClass);
                // 제외 해제
            } else {
                $member.removeClass(disableClass);
            }

            filterbackpackr[index].is_disable = isDisabled;
        } catch (e) {
            console.log(e);
        }
    }

    // 전체 토글
    function toggleAllMember(e) {
        var isChecked = e.currentTarget.checked;
        var $itemlist = $('.member-list.body .member-list.member');

        $.each($itemlist, function(i, e) {
            updateMemberState($(e), isChecked);
        });

        store.emit('updateMemberCount', filterbackpackr);
        store.emit('renderSplit');
        store.emit('renderSearch');
    }

    // 게임 선택
    function selectSadari() {
        var idx = $(this)
            .parent()
            .index();
        sadariType = $(this).data('game');
        selectedGameType = $(this).data('game-id');

        $('.sadari-select')
            .find('button')
            .removeClass('is_on');
        $(this).addClass('is_on');
        $('.tab')
            .find('> [class^=tab]')
            .hide()
            .eq(idx)
            .show();

        var tabId = $('.tab')
            .find('> [class^=tab]')
            .eq(idx)
            .attr('data-tab-id');

        if (tabId) {
            ju = store.emit('getJu-' + tabId)[0];
        }
    }

    // 마지막에 당첨된 유저 가져오기
    function getLastWinUserList() {
        var url = '/game/last_member_list/' + selectedGameType;
        $.get(url).done(function(res) {
            if (!res) {
                console.log('error');
                return false;
            }
            var res = JSON.parse(res);
            updateUserList(res);
        });
    }

    // 멤버 상태 초기화
    function resetMemberState(render) {
        var $itemlist = $('.member-list.body .member-list.member');

        $.each($itemlist, function(i, e) {
            updateMemberState($(e), false);
        });

        if (!render) {
            store.emit('updateMemberCount', filterbackpackr);
        }
    }

    // 멤버들 상태 업데이트
    function updateUserList(res) {
        var $memberList = $('.member-list.body');

        resetMemberState(false);

        $.each(res, function(index, value) {
            var userId = value.user_id;
            var $elm = $memberList.find('[data-member-id="' + userId + '"]');

            updateMemberState($elm, true);
        });

        store.emit('updateMemberCount', filterbackpackr);
    }

    // 멤버 가져오기
    function getMember() {
        return $.getJSON('/member').done(function(res) {
            var html = '';
            res.forEach(function(member) {
                html += sd.tmpl.member(member);
            });
            $memberBody.html(html);
        });
    }

    // 필터된 멤버 데이터 가져오기
    function _getAllMemberList() {
        return filterbackpackr;
    }

    /**
     * 유저 선택, 랜더링
     * @param {int} index 유저 인덱스
     * @return void;
     */
    function _selectUser(index) {
        var $member = $memberList.eq(index);
        var isDisabled = true;

        if ($member.is('.is_disable')) {
            isDisabled = false;
        }

        updateMemberState($member, isDisabled);
        store.emit('updateMemberCount', filterbackpackr);
        store.emit('renderSplit');
        store.emit('renderSearch');
    }

    // 게임 데이터 기록, 저장
    function _gameResultCommit() {
        try {
            var data = [];
            $.each(lastResult, function(index, value) {
                var title = value.title;

                // loop member
                $.each(value.member, function(index, value) {
                    var member = {
                        group_name: title,
                        user_id: value.id
                    };

                    data.push(member);
                });
            });

            var param = {
                game_type: selectedGameType,
                result_data: data
                // EXAMPLE result_date
                // result_data: [
                //     {
                //         user_id: 72,
                //         group_name: 'test',
                //     },
                // ]
            };

            $.post(apiCommit, param).done(function(res) {
                console.log(res);
            });
        } catch (e) {
            console.log(e);
        }
    }

    // 게임 종류 리턴
    function _getGameType() {
        return sadariType;
    }

    // 유저 클릭 핸들러
    function _handleClickMember(e) {
        e.stopPropagation();

        var $target = $(e.currentTarget);
        var index = $target.parents('.member-list.member').index();

        store.emit('selectUser', index);
    }

    // 지난주 걸린 사람 제외하기 버튼 클릭 핸들러
    function _handleClickPrevMember() {
        if (selectedGameType === 5) {
            getLastWinUserList();
        }
    }

    function _updateMemberList() {
        $memberList = $memberBody.find('.member-list.member');
    }

    // 사다리 시작
    function startSadari() {
        filterDisableMember();
        game[sadariType]();
        store.emit('renderTextResult');
        store.emit('randomTargetHide');
    }

    // 이벤트 바인딩
    function bindEvent() {
        $(document)
            .on(
                'click',
                '.member-list.wrap .member-list.member input:checkbox',
                _handleClickMember
            )
            .on('click', '.js-all-check-master', toggleAllMember);
        $('.sadari-select').on('click', 'button', selectSadari);
        $('.start').on('click', startSadari);
        $('.exclude-prev-member').on('click', _handleClickPrevMember);

        store.on('selectUser', _selectUser);
        store.on('getGameType', _getGameType);
        store.on('getAllMemberList', _getAllMemberList);
        store.on('findIndexById', findIndexById);
    }

    // 멤버 비동기 호출 후 시작
    function start(res) {
        bindEvent();
        _updateMemberList();
        initData(res);
        quickSearch();
        randomTarget();

        store.emit('updateMemberCount', filterbackpackr);

        $('.sadari-select')
            .find('button:eq(0)')
            .trigger('click');
    }

    // 데이터 초기화
    function initData(data) {
        _backupInitMember = data.slice();
        filterbackpackr = filterWorkMember(data.slice());
    }

    function init() {
        getMember().done(start);
    }

    // init();
})(window, jQuery, modal);

//# sourceMappingURL=index.js.map
