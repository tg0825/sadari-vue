function search() {
    // 현재 인풋 값
    var inputValue;
    
    // 직원들 리스트
    var memberList = store.emit('getAllMemberList')[0];
    
    console.log(memberList);
    
    // 매칭된 index 리스트
    var matchData = [];
    
    // jquery dom search input
    var $search = $('.search');
    
    // jquery dom search result
    var $result = $('.search-result');
    
    function render() {
        var html = '';
        matchData.forEach(function (data) {
            html += `<div><label class="member-list member size-s" style="background-color:${data.team_color}">
                <input type="checkbox" class="js-all-check-item">
                    <span class="name">${data.name}</span>
                    <span class="team">${data.team}</span>
                </label></div>`;
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
        $search.on('keyup', _handleKeyup);
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