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
