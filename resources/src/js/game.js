(function(window, $, modal) {
  // api 저장
  var apiCommit = "/game/insert";

  // 사다리 종류
  var sadariType = "one";

  // 현재 선택된 게임 타입
  var selectedGameType = null;

  // 최초 순수 구성원
  var originbackpackr;

  // 필터 적용 된 구성원
  var filterbackpackr;

  // 랜덤 적용 된 구성원
  var randombackpackr = [];

  // 결과값 저장 임시 공간
  var temp;

  // 최종 결과 데이타 (모달 출력 데이터)
  var lastResult;

  // cssClass 유저 제외
  var disableClass = "is_disable";

  // jquery dom member list
  var $memberList = $(".member-list.body").find(".member-list.member");

  // jquery dom
  var $wrap = $(".sadari.wrap");

  // 사다리 종류
  var game = {
    // 카운트 조회
    getValue: function(selector) {
      var value = $(selector).val();
      return value;
    },
    // 한명 뽑기
    one: function() {
      var count = this.getValue("#onlyOne");
      var groupCount = 1;
      var data = {
        a: count, // 출력 인원
        b: groupCount, // 그룹 수
        c: randombackpackr // 선택 되지 않은 인원
      };

      result(data);
    },
    jo_member: function() {
      var count = this.getValue("#groupMember") || 3;
      var groupCount = Math.ceil(randombackpackr.length / count);
      var data = {
        a: count, // 한조 인원
        b: groupCount, // 그룹 수
        c: randombackpackr // 랜덤 값
      };

      console.log(data);
      result(data, true);
    },
    jo_team: function() {
      var count = this.getValue("#groupCount") || 3;
      var groupCount = Math.ceil(randombackpackr.length / count);
      var data = {
        a: groupCount, // 한조 인원
        b: count, // 그룹 수
        c: randombackpackr // 랜덤 값
      };

      console.log(data);
      result(data);
    },
    // 주번, 손
    ju: function() {
      var count = 1; // 임의값
      var groupCount = ju.length;
      var data = {
        a: count,
        b: groupCount, // 청소 종류
        c: randombackpackr,
        jo_name_ju: true // 조 이름 주번 이름으로 사용
      };

      result(data);
    },
    // 랜덤점심
    jo_lunch: function() {
      var groupCount = this.getValue("#groupCount");
      var groupMemberCount = Math.ceil(randombackpackr.length / groupCount);
      var data = {
        groupCount: groupCount
      };

      // 유효성 검사
      if (randombackpackr.length == 0 || !groupCount || groupCount == 0) {
        alert("값을 확인해주세요.");
        return;
      }

      resultLunch(data);
    }
  };

  // id로 멤버 인덱스 구하기
  function findIndexById(id) {
    var index = $(".member-list.body")
      .find('.member-list.member[data-member-id="' + id + '"]')
      .index();

    return index;
  }

  // 게임 종류 리턴
  function _getGameType() {
    return sadariType;
  }

  // 배열 랜덤 섞기
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  // 구성원 데이터 재구성
  function filterDisableMember() {
    var remap = filterbackpackr.slice().filter(function(v) {
      if (v.is_disable === true) {
        return false;
      }
      return true;
    });

    shuffle(remap);

    return remap;
  }

  // 퇴사한 사람, 출근 전 사람 제외
  function filterWorkMember(arg) {
    var now = new Date().getTime();
    var date;
    var y;
    var m;
    var d;

    function check(x) {
      if (x === "") {
        return true;
      }
      y = x.substr(0, 4);
      m = x.substr(4, 2);
      d = x.substr(6, 2);

      m -= 1;
      date = Date.UTC(y, m, d);
      return date;
    }

    var re = arg.filter(function(v) {
      if (v.hasOwnProperty("startDate")) {
        date = check(v.startDate);

        if (now < date) {
          return false;
        }
      }

      if (v.hasOwnProperty("resign") && v.resign) {
        date = check(v.resign);

        if (now > date) {
          return false;
        }
      }
      return true;
    });
    return re;
  }

  // 결과 html 제작
  function renderHtml(data, onegroup) {
    var html = "";
    try {
      // 결과
      data.forEach(function(group) {
        if (onegroup) {
          html += '<div class="group item onegroup">';
        } else {
          html +=
            '<div class="group item"><div class="group title">' +
            group.title +
            "</div>";
        }

        group.member.forEach(function(groupMember, memberIndex) {
          html +=
            "<div data-index=" +
            memberIndex +
            ' class="member-list member ' +
            (groupMember.team_eng || "") +
            '"' +
            ' style="background-color:' +
            (groupMember.team_color || "#ddd") +
            '">' +
            '<span class="name">' +
            groupMember.name +
            "</span>" +
            '<span class="team">' +
            groupMember.team +
            "</span>" +
            "</div>";
        });

        html += "</div>";
      });
    } catch (e) {
      console.log(e);
    }
    return html;
  }

  // 점심 전용 결과 출력
  function resultLunch(data) {
    var list = [];

    // 팀별 직원 정렬
    $.each(randombackpackr, function(index, memberObj) {
      // 팀 존재 유무
      var isTeamExist = false;

      // 현재 팀 이름
      var thisTeam = memberObj.team;

      // list 배열에 현재 팀 이름 존재 유무 반환
      $.each(list, function(index, team) {
        if (team.teamName === thisTeam) {
          isTeamExist = true;

          // break;
          return false;
        }
      });

      // list 배열에 팀이 없으면 팀을 추가
      if (!isTeamExist) {
        list.push({
          teamName: memberObj.team,
          teamMember: []
        });
      }

      // 변경 된 list 배열을 돌면서 팀
      $.each(list, function(index, team) {
        if (team.teamName === thisTeam) {
          list[index].teamMember.push(memberObj);

          // break;
          return false;
        }
      });
    });

    // 팀별 리스트에서 멤버만 추출
    var memberListList = (function() {
      return list.map(function(teamObj, index) {
        return teamObj.teamMember;
      });
    })();

    // 팀별 배열 하나로 병합
    var memberStack = [];
    $.each(memberListList, function(index, memberList) {
      memberStack = memberStack.concat(memberList);
    });

    // 모든 인원 루프 돌면서 해당 index에 푸시
    var orderByGroup = [];
    var i = 0;
    $.each(memberStack, function(index, member) {
      if (i == data.groupCount) {
        i = 0;
      }

      if (!orderByGroup[i]) {
        orderByGroup.push({
          title: i + 1 + "조",
          member: []
        });
      }

      orderByGroup[i].member.push(member);
      i += 1;
    });

    $wrap.addClass("is_result");
    modal.open(renderHtml(orderByGroup));

    _gameResultCommit();
  }

  // 결과 출력
  // a 한 그룹의 인원
  // b 그룹 수
  // c 램덤 인원
  // restGroupType
  function result(data, restGroupType) {
    temp = $.extend(true, {}, data);

    var i = 0;
    var onegroup = data.b === 1;
    var resultObj = [];
    var msg;

    // 주번(손) 일 경우 onegroup 옵션 사용 안함
    if (data.jo_name_ju) {
      onegroup = false;
    }

    try {
      if (data.b <= 0 || data.a <= 0 || data.c.length === 0) {
        msg = "값을 확인해주세요.";
        alert(msg);
        throw new Error(msg);
      }

      // 그룹 수 만큼 반복
      while (i < data.b) {
        var groupData = {
          title: data.jo_name_ju ? ju[i] : i + 1 + "조",
          member: data.jo_name_ju ? [data.c[i]] : data.c.splice(0, data.a)
        };

        if (restGroupType && groupData.member.length < data.a) {
          if (confirm("나머지 인원이 있습니다. 다른 조에 포함 시키겠습니까?")) {
            groupData.member.forEach(function(v, idx) {
              resultObj[idx].member.push(v);
            });
            break;
          }
        }

        resultObj.push(groupData);
        i++;
      }

      lastResult = $.extend(true, {}, resultObj);

      $wrap.addClass("is_result");
      modal.open(renderHtml(resultObj, onegroup));

      _gameResultCommit();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 상태 업데이트
   * @param {jquery dom object} $member 멤버 엘리먼트
   * @param {Boolean} isDisabled 비활성 유무
   * @return void;
   */
  function updateState($member, isDisabled) {
    try {
      var index = $member.index();

      // 제외
      if (isDisabled) {
        $member.addClass(disableClass);
        // 제외 해제
      } else {
        $member.removeClass(disableClass);
      }

      filterbackpackr[index].is_disable = isDisabled;
    } catch (e) {
      console.log(e);
    }
  }

  // 전체 토글
  function toggleAllMember(e) {
    var isChecked = e.currentTarget.checked;
    var $itemlist = $(".member-list.body .member-list.member");

    $.each($itemlist, function(i, e) {
      updateState($(e), isChecked);
    });

    store.emit("updateMemberCount", filterbackpackr);
    store.emit("renderSplit");
    store.emit("renderSearch");
  }

  // 게임 시작
  function startSadari() {
    randombackpackr = filterDisableMember();

    // 게임 시작
    game[sadariType]();
    store.emit("renderTextResult");
  }

  // 게임 선택
  function selectSadari() {
    var idx = $(this)
      .parent()
      .index();
    sadariType = $(this).data("game");
    selectedGameType = $(this).data("game-id");

    $(".sadari-select")
      .find("button")
      .removeClass("is_on");
    $(this).addClass("is_on");
    $(".tab")
      .find("> [class^=tab]")
      .hide()
      .eq(idx)
      .show();

    var tabId = $(".tab")
      .find("> [class^=tab]")
      .eq(idx)
      .attr("data-tab-id");

    if (tabId) {
      ju = store.emit("getJu-" + tabId)[0];
    }
  }

  // 게임 데이터 기록, 저장
  function _gameResultCommit() {
    try {
      var data = [];
      $.each(lastResult, function(index, value) {
        var title = value.title;

        // loop member
        $.each(value.member, function(index, value) {
          var member = {
            group_name: title,
            user_id: value.user_id
          };

          data.push(member);
        });
      });

      var param = {
        game_type: selectedGameType,
        // result_data: [
        //     {
        //         user_id: 72,
        //         group_name: 'test',
        //     },
        //     {
        //         user_id: 73,
        //         group_name: 'test'
        //     },
        // ]
        result_data: data
      };

      $.post(apiCommit, param);
    } catch (e) {
      console.log(e);
    }
  }

  // 마지막 유저 가져오기
  function getLastUserList() {
    var url = "/game/last_member_list/" + selectedGameType;
    $.get(url).done(function(response) {
      if (!response) {
        console.log("error");
        return false;
      }
      var res = JSON.parse(response);
      updateUserList(res);
    });
  }

  // 멤버 상태 초기화
  function resetMemberState(render) {
    var $itemlist = $(".member-list.body .member-list.member");

    $.each($itemlist, function(i, e) {
      updateState($(e), false);
    });

    if (!render) {
      store.emit("updateMemberCount", filterbackpackr);
    }
  }

  // 멤버들 상태 업데이트
  function updateUserList(res) {
    var $memberList = $(".member-list.body");

    resetMemberState(false);

    $.each(res, function(index, value) {
      var userId = value.user_id;
      var $elm = $memberList.find('[data-member-id="' + userId + '"]');

      updateState($elm, true);
    });

    store.emit("updateMemberCount", filterbackpackr);
  }

  // 필터된 멤버 데이터 가져오기
  function _getAllMemberList() {
    return filterbackpackr;
  }

  // 데이터 초기화
  function initData() {
    var backpacker = [];

    $memberList.each(function(i, e) {
      var $member = $(e);
      var member = {
        name: $member.find(".name").html(),
        team: $member.find(".team").html(),
        user_id: $member.data("member-id"),
        team_eng: $member.data("team-eng"),
        team_color: $member.data("team-color")
      };

      backpacker.push(member);
    });

    originbackpackr = backpacker.slice();
    filterbackpackr = filterWorkMember(backpacker.slice());
  }

  // 유저 선택, 랜더링
  function _selectUser(index) {
    var $item = $memberList.eq(index);
    var isDisabled = true;

    if ($item.is(".is_disable")) {
      isDisabled = false;
    }

    updateState($item, isDisabled);
    store.emit("updateMemberCount", filterbackpackr);
    store.emit("renderSplit");
    store.emit("renderSearch");
  }

  // 유저 클릭 핸들러
  function _handleClickMember(e) {
    e.stopPropagation();

    var $target = $(e.currentTarget);
    var index = $target.parents(".member-list.member").index();

    store.emit("selectUser", index);
  }

  // 지난주 걸린 사람 제외하기 버튼 클릭 핸들러
  function _handleClickPrevMember() {
    if (selectedGameType === 5) {
      getLastUserList();
    }
  }

  // 이벤트 바인딩
  function bindEvent() {
    $(document)
      .on(
        "click",
        ".member-list.wrap .member-list.member input:checkbox",
        _handleClickMember
      )
      .on("click", ".js-all-check-master", toggleAllMember);
    $(".sadari-select").on("click", "button", selectSadari);
    $(".start").on("click", startSadari);
    $(".exclude-prev-member").on("click", _handleClickPrevMember);

    store.on("selectUser", _selectUser);
    store.on("getGameType", _getGameType);
    store.on("getAllMemberList", _getAllMemberList);
    store.on("findIndexById", findIndexById);
  }

  function init() {
    bindEvent();
    initData();

    $(".sadari-select")
      .find("button:eq(0)")
      .trigger("click");
    store.emit("updateMemberCount", filterbackpackr);
  }

  init();
})(window, jQuery, modal);
