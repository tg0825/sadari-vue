function search() {
    // 현재 인풋 값
    var inputValue;
    
    // 직원들 리스트
    var memberList = store.emit('getAllMemberList')[0];
    
    // 매칭된 index 리스트
    var matchData = [];
    
    // jquery dom search input
    var $sort = $('.sort');
    
    // jquery dom search result
    var $result = $('.sort-list');
    
    function render() {
        var html = '';
        matchData.forEach(function (data) {
            html += sadari.tmpl.member(data);
        });
        $result.html(html);
    }
    
    // 매칭되는 맴버 인덱스 구하기
    function searchMember() {
        matchData = [];
        
        $.each(memberList, function (index, value) {
            if (value.name.indexOf(inputValue) > -1) {
                matchData.push(value);
            }
        });
        
        render();
    }
    
    function clear() {
        $result.empty();
    }
    
    // id로 인덱스 구하기
    function findIndexById(id) {
        var index = $('.member-list.body')
            .find('.member-list.member[data-member-id="' + id + '"]')
            .index();
            
        return index;
    }
    
    // 유저 선택
    function _handleChange(e) {
        try {
            var $parent = $(e.currentTarget.parentNode);
            var id = $parent.attr('data-member-id');
            var index = findIndexById(id);
            store.emit('selectUser', index);
            render();
        } catch (e) {
            console.log(e);
        }
    }
    
    // 엔터 핸들러
    function _handleEnter(e) {
        if (e.keyCode == 13) {
            var childLength = $result.children().length;
            var $target = $result.children().eq(0);
            var id = $target.attr('data-member-id');
            var index = findIndexById(id);
            
            if (childLength > 1) return false;
            
            store.emit('selectUser', index);
            render();
        }
    }
    
    // 키 이벤트 핸들러
    function _handleKeyup(e) {
        inputValue = e.target.value;
        
        if (!inputValue) {
            clear();
            return false;
        }
        
        searchMember();
        
    }
    
    // 바인드 이벤트
    function _bindEvent() {
        // $search
        //     .on('keyup', _handleKeyup)
        //     .on('keypress', _handleEnter);
        // $result
        //     .on('change', '.js-all-check-item', _handleChange)
    }
    
    // 초기화
    function init() {
        _bindEvent();
    }
    
    init();
}

$(function () {
    search();
});