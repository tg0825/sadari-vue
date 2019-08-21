var backpacker = [];
var ju = [];
// var ju = [
//     "청소기",
//     "대걸레",
//     "마루바닥",
//     "집기닦이",
//     "공기청정기",
//     "유리청소",
//     "전등",
// ];

// 한글 명칭 추가
backpacker = (function (bp) {
    var ko = {
        ceo: '대표이사',
        designer: '디자이너',
        engineer: '개발자',
        trade: 'B2B',
        scouter: '작가영입',
        manager: '운영',
        educator: '작가교육',
        marketer: '마케팅',
        pr: '홍보',
    }
    
    bp = bp.map(function (v, i, a) {
        var t = '' + v.team;
        t = t.toLowerCase();

        if (typeof t === 'undefined') {
            return
        }

        for (var k in ko) {
            var re = new RegExp(k, 'g');
            var res = t.match(re);

            if (Array.isArray(res)) {
                v.ko = ko[k];
                break;
            }
        }
        return v;
    });

    return bp;
}(backpacker));
