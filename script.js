$(function () {
    // 팀당 인원
    var memberNumber = 3;

    // 전체인원
    var backpacker = [
        {
            name: '1'
        },
        {
            name: '2'
        },
        {
            name: '3'
        },
        {
            name: '김동완'
        },
        {
            name: '김동철'
        },
        {
            name: '하동현'
        },
        {
            name: '이재군'
        },
        {
            name: '박정호'
        },
        {
            name: '김경신',
        },
        {
            name: '넘버식스'
        },
        {
            name: '최재훈'
        },
        {
            name: '윤태건'
        },
        {
            name: '정성묵'
        },
        {
            name: '박우현'
        },
        {
            name: '김혜림'
        },
        {
            name: '이원희'
        },
        {
            name: '강혜지'
        },
        {
            name: '박선재'
        },
        {
            name: '최백호'
        },
        {
            name: '박희균'
        },
        {
            name: '나정귀'
        },
        {
            name: '김경범'
        }
    ];

    var clonebackpacker = backpacker.slice();

    // 배열 섞기
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    // 결과 출력
    function result(m, g, tmpbp) {
        var html = '';
        var i = 0;
        while (i < g) {
            var groupMember = tmpbp.splice(0, m);

            html += '<div class="group item">' +
            '<div class="group title">' + (i+1) + '조</div>';
            for (var j = 0; j < groupMember.length; j++) {
                html += '<div class="group member"><span class="name">' +
                groupMember[j].name +
                '</span></div>';
            }
            html += '</div>';
            i += 1;
        }
        $('.result').html(html);
    }

    // 중복값 찾기
    function compare(arr, str) {
        var result;
        arr = arr || clonebackpacker;

        arr.some(function (e, a) {
            if (e.name === str) {
                result = {
                    name: str,
                    idx: a
                };

                return true;
            }

            return false;
        });

        return result;
    }

    function addMem(v) {
        return clonebackpacker.push({
            name: v
        });
    }

    function _render(v) {
        var memberList = '';
        v = v || clonebackpacker;

        for(var i = 0; i < v.length; i++) {
            memberList += '<div class="member-list member">' +
            '<span class="name">' +
            v[i].name +
            '</span></div>';
        }

        $('.member-list.body').html(memberList);
        $('.member-list.number').html(v.length);
    }

    function remove(v) {
        clonebackpacker.splice(v, 1);

        _render();
    }

    function endEdit(v, i) {
        clonebackpacker[i].name = v;

        $(this)
            .removeClass('edit')
            .text('')
            .append('<span class="name">' +
        clonebackpacker[i].name +
        '</span>');
    }

    function alertMsg(msg) {
        var $comment = $('<p class="f-error"></p>');
        var $parent = $(document.forms[0].name).parent();

        $parent.find('.f-error').remove();
        $comment
            .append(msg)
            .appendTo($parent)
            .delay(1000)
            .queue(function () {
                $(this).remove().dequeue();
            });
    }

    // 이름 수정
    $(document).on({
        click: function () {
            var self = this;
            var $self = $(self);
            var idx = $self.index();
            var oldText = $self.find('.name').text();
            var $input = $('<input maxLength="10" type="text">');

            if ($(this).is('.edit')) {
                return;
            }

            $input.val(oldText);
            $self
                .text('')
                .addClass('edit')
                .append($input)
                .find($input)
                .focus()
                .on({
                    focusout: function () {
                        var text = $(this).val();
                        endEdit.call(self, text, idx);
                    },
                    keypress: function (e) {
                        if (e.keyCode == 13) {
                            $(this).trigger('focusout');
                        }
                    }
                });
        },
        mouseenter: function () {
            $(this).append('<span class="remove">x</span>');
        }
    }, '.member-list.member');

    // 삭제
    $(document).on('click', '.member-list.member .remove', function (e) {
        e.stopPropagation();
        var idx = $(this).parent().index();
        remove(idx);
    });

    // 초기화
    $(document).on('click', '.reset', function () {
        if (confirm ('구성원을 초기화 시키겠습니까?')) {
            _render(backpacker);
        }
    });

    // 인원 추가
    $('#frm').on('submit', function (e) {
        e.preventDefault();

        // 추가할 직원 이름
        var $name = $('#name');
        var name = $name.val();

        // 빈값, 중복 이름 여부 채크
        var com = compare(clonebackpacker, name);

        if (name === '') {
            alertMsg('이름을 입력해 주세요.');
            return;
        }

        if (com) {
            alertMsg('이미 등록된 이름 입니다.');
            $('.member-list.body .member')
                .eq(com.idx)
                .addClass('highlight')
                .delay(300)
                .queue( function () {
                    $(this).removeClass('highlight').dequeue();
                });
            return;
        }

        addMem(name);
        _render();
        $name.val('');
    });

    // 시작
    $('.start').on('click', function () {
        var tmpbackpacker = clonebackpacker.slice();
        var groupCount;

        memberNumber = $('#groupMember').val();
        groupCount = Math.ceil(tmpbackpacker.length / memberNumber);

        shuffle(tmpbackpacker);
        result(memberNumber, groupCount, tmpbackpacker);
    });

    // 조 기준 시작
    $('.start-group').on('click', function () {
        var tmpbackpacker = clonebackpacker.slice();
        var count = $('#groupCount').val();
        var groupCount = Math.floor(tmpbackpacker.length / count);

        shuffle(tmpbackpacker);
        result(groupCount, count, tmpbackpacker);
    });
    _render();
});
