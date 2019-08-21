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
