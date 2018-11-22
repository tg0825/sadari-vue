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
