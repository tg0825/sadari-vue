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
