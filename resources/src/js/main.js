(function (window, $, modal) {
    var $wrap = $('.sadari.wrap');
    var sadariType = 'one';
    var clonebackpacker = window.clonebackpacker || {};
    var tmpbackpacker = [];
    var originBp;
    
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

    // 구성원 데이터 재구성
    function filtering() {
        var remap = clonebackpacker.slice().filter(function (v) {
            if (v.is_disable === true) {
                return false;
            }
            return true;
        });

        shuffle(remap);

        return remap;
    }

    // 퇴사한 사람, 출근 전 사람 제외
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

    // 사다리 종류
    var game = {
        one: function () {
            var count = $('#onlyOne').val();
            var groupCount = 1;
            var data = {
                a: count, // 출력 인원
                b: groupCount, // 그룹 수
                c: tmpbackpacker // 선택 되지 않은 인원
            };

            console.log(data);
            result(data);
        },
        jo_member: function () {
            var count = $('#groupMember').val() || 3;
            var groupCount = Math.ceil(tmpbackpacker.length / count);
            var data = {
                a: count, // 한조 인원
                b: groupCount, // 그룹 수
                c: tmpbackpacker // 랜덤 값
            };
            
            console.log(data);
            result(data, true);
        },
        jo_team: function () {
            var count = $('#groupCount').val() || 3;
            var groupCount = Math.ceil(tmpbackpacker.length / count);
            var data = {
                a: groupCount, // 한조 인원
                b: count, // 그룹 수
                c: tmpbackpacker // 랜덤 값
            };
            
            console.log(data);
            result(data);
        },
        // 주번
        ju: function () {
            var groupCount = ju.length;
            var data = {
                a: 1, // 조 에서는 기준값 사용 안함
                b: groupCount, // 청소 종류
                c: tmpbackpacker,
                jo_name_ju: true // 조 이름 주번 이름으로 사용
            };
            
            console.log(groupCount);
            console.log(data);

            result(data);
        },
        // 랜덤점심
        jo_lunch: function () {
            var groupCount = $('#groupCount').val();
            var groupMemberCount = Math.ceil(tmpbackpacker.length / groupCount);
            var data = {
                a: groupMemberCount, // 조 인원
                b: groupCount,//한 그룹당 인원
                c: tmpbackpacker// 인원
            };
            
            var list = [];
            
            // get Team List
            $.each(tmpbackpacker, function (index, memberObj) {
                // 팀 존재 유무
                var isTeamExist = false;
                
                // 현재 팀 이름
                var thisTeam = memberObj.team;
                
                // list 배열에 현재 팀 이름이 존재 유무 반환
                $.each(list, function (index, team) {
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
                $.each(list, function (index, team) {
                    if (team.teamName === thisTeam) {
                        list[index].teamMember.push(memberObj);
                        
                        // break;
                        return false;
                    }
                });
            });
                
            // extract member only
            var memberListList = (function () {
                return list.map(function (teamObj, index) {
                    return teamObj.teamMember;
                });
            }());
            
            var memberStack = [];
            $.each(memberListList, function (index, memberList) {
                memberStack = memberStack.concat(memberList);
            });
            
            // 모든 인원에 대해 루프를 돌며 그룹 index로 해당 배열에 푸시
            var orderByGroup = [];
            var i = 0;
            
            $.each(memberStack, function (index, member) {
                if (i == groupCount) {
                    i = 0;
                }
                
                if (!Array.isArray(orderByGroup[i])) {
                    orderByGroup[i] = [];
                }
                
                orderByGroup[i].push(member);
                
                i += 1;
            });
            
            $wrap.addClass('is_result');
            modal.open(renderLunch(orderByGroup));
        }
    };
    
    // 랜덤 점심용 랜더
    function renderLunch(data, onegroup) {
        console.log(data);
        var html = '';
        try {
            data.forEach(function (group, index) {
                html += '<div class="group item"><div class="group title">' + (index + 1) + '조</div>';
                
                $.each(group, function (memberIndex, groupMember) {
                    html += '<div data-index=' + memberIndex + ' class="member-list member ' + (groupMember.team_eng || '') + '"' +
                        ' style="background-color:' + (groupMember.team_color || '#ddd') + '">' +
                        '<span class="name">' + groupMember.name + '</span>' +
                        '<span class="team">' + groupMember.team + '</span>' +
                        '</div>';
                });
                
                html += '</div>';
            });
        } catch (e) {
            console.log(e);
        }
        return html;
    }
        
    // 결과 html 제작
    function renderHtml(data, onegroup) {
        var html = '';
        try {
            console.log(data);
            data.forEach(function (group) {
                if (onegroup) {
                    html += '<div class="group item onegroup">';    
                } else {
                    html += '<div class="group item"><div class="group title">' + group.title + '</div>';
                }
                
                group.member.forEach(function (groupMember, memberIndex) {
                    html += '<div data-index=' + memberIndex + ' class="member-list member ' + (groupMember.team_eng || '') + '"' +
                        ' style="background-color:' + (groupMember.team_color || '#ddd') + '">' +
                        '<span class="name">' + groupMember.name + '</span>' +
                        '<span class="team">' + groupMember.team + '</span>' +
                        '</div>';
                });
                html += '</div>';
            });
        } catch (e) {
            console.log(e);
        }
        return html;
    }

    // 결과 출력
    // restGroupType
    // a 한 그룹의 인원
    // b 그룹 수
    // c 램덤 인원
    function result(data, restGroupType) {
        var i = 0;
        var onegroup = (data.b === 1);
        var resultObj = [];

        if (data.b <= 0 || data.a <= 0) {
            alert('값을 확인해주세요');
            return false;
        }
        
        // 그룹 수 만큼 반복
        while (i < data.b) {
            var groupData = {
                title: data.jo_name_ju ? ju[i] : (i + 1) + '조',
                member: data.jo_name_ju ? [data.c[i]] : data.c.splice(0, data.a)
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
        modal.open(renderHtml(resultObj, onegroup));
    }

    // 상태 업데이트
    function updateState(index, state) {
        clonebackpacker[index].is_disable = state;
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
        tmpbackpacker = filtering();
        
        // 게임 시작
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
        $('.sadari-select').on('click', 'button', selectSadari);
        $('.start').on('click', startSadari);
        
        store.on('getGameType', _getGameType);
    }
    
    function init() {
        bindEvent();
        initData();
        
        $('.sadari-select').find('button:eq(0)').trigger('click');
        store.emit('updateMemberCount', clonebackpacker);
    }
    
    init();
}(window, jQuery, modal));
