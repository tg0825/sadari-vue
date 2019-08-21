// 인원 카운트
(function () {
    var $memberListNumber = $('.member-list.number');
    
    function renderMemberCount(member) {
        var max = member.length;
        var disable = member.filter(function (v) {
            if (v.is_disable === true) {
                return true;
            }
            return false;
        });
        
        $memberListNumber.html((max - disable.length) + '/' + max);
    }
    
    store.on('updateMemberCount', renderMemberCount);
})();
