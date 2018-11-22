var renderText;
    
// 텍스트결과 토글
function resultTextToggle() {
    var target = document.querySelector('.resultText');
    target.style.display = (target.style.display === 'none') ? '' : 'none';
}

$(document).on('click', '[data-sadari="result-toggle"]', resultTextToggle);
    
// 결과 텍스트로 만들기
function resultText() {
    var _sadariType = store.emit('getGameType')[0];
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
    switch(_sadariType) {
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

store.on('renderTextResult', resultText);
store.on('getRenderText', function () {
    return renderText;
});
