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
