// 주번
(function () {
    var storage = new Storage();
    
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
        
    function _handleKeypressAdd(e) {
        if (e.keyCode == 13) addJu(e);
    }
        
    $('.js-tab-ju')
        .on('click', '.ju-add button', addJu)
        .on('keypress', '.ju-add #name', _handleKeypressAdd)
        .on('click', '.ju-list li', removeJu);

    initJu();
}())
