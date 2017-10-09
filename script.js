$(function () {
    // 팀당 인원
    var memberNumber = 3;

    // 전체인원
    var backpacker = [
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

    // 깊은 복사
    var originBackpacker = backpacker.slice();

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

    // resultRender
    function resultRender(m, g) {
        var html = '';
        var i = 0;
        var clonebackpacker = backpacker.slice();
        while (i < g) {
            var groupMember = clonebackpacker.splice(0, m);

            html += '<div class="group item">' +
            '<div class="group title">' + (i+1) + '조</div>';
            for (var j = 0; j < groupMember.length; j++) {
                html += '<div class="group member"><span class="name">' +
                groupMember[j].name +
                '</span></div>';
            }
            html += '</div>';
            i+=1;
        }
        $('.result').html(html);
    }

    // 중복값 찾기
    function compare(arr, str) {
        var result;
        arr = arr || backpacker;

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
        return backpacker.push({
            name: v
        });
    }

    function _render(v) {
        var memberList = '';
        v = v || backpacker;
        for(var i = 0; i < v.length; i++) {
            memberList += '<div class="member-list member">' +
            '<span class="name">' +
            v[i].name +
            '</span>' +
            '</div>';
        }
        $('.member-list.body').html(memberList);
        $('.member-list.number').html(v.length);
    }

    function remove(v) {
        backpacker.splice(v, 1);

        _render();
    }

    function endEdit(v, i) {
        backpacker[i].name = v;
        $(this)
            .removeClass('edit')
            .text('')
            .append('<span class="name">' +
        backpacker[i].name +
        '</span>');
    }

    // 이름 수정
    $(document).on({
        click: function () {
            var self = this;
            var idx = $(this).index();
            var oldText = $(this).find('.name').text();
            var $input = $('<input type="text">');

            if ($(this).is('.edit')) {
                return;
            }

            $input.val(oldText);
            $(this).addClass('edit');
            $(this).text('').append($input);
            $(this).find($input).focus();

            $(this).find('input').on({
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
    $(document).on('click', '.member-list.member .remove', function () {
        var idx = $(this).index();
        remove(idx);
    });

    // 초기화
    $(document).on('click', '.reset', function () {
        if (confirm ('구성원을 초기화 시키겠습니까?')) {
            backpacker = originBackpacker.slice();
            _render(originBackpacker);
        }
    });

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

    // 인원 추가
    $('#frm').on('submit', function (e) {
        e.preventDefault();

        // 추가할 직원 이름
        var $name = $('#name');
        var name = $name.val();

        // 빈값, 중복 이름 여부 채크
        var com = compare(backpacker, name);

        if (name === '') {
            alertMsg('이름을 입력해 주세요.');
            return;
        }

        if (com) {
            alertMsg('중복된 이름입니다.');
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
    document.querySelector('.start').addEventListener('click', function () {
        shuffle(backpacker);

        // 한 조당 인원 수
        memberNumber = $('#groupMember').val();

        // 그룹 수
        var groupNumber = Math.ceil(backpacker.length / memberNumber);

        resultRender(memberNumber, groupNumber);
    });

    _render();

    $('.start').click();
});
