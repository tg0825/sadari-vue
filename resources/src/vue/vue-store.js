import Vue from 'vue'
import Vuex from 'vuex'
import api from './api';

Vue.use(Vuex);

/**
 * 결과 출력
 * @param {object} data 그룹 데이터
 * a 한 그룹의 인원
 * b 그룹 수
 * c 램덤 인원
 * @param {bool} restGroupType 남은 그룹 방식
 * @return void
 */
function buildResultData(data, restGroupType) {
    const temp = $.extend(true, {}, data);

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
            msg = '값을 확인해주세요.';
            alert(msg);
            throw new Error(msg);
        }

        // 그룹 수 만큼 반복
        while (i < data.b) {
            var groupData = {
                title: data.jo_name_ju ? ju[i] : i + 1 + '조',
                member: data.jo_name_ju
                    ? [data.c[i]]
                    : data.c.splice(0, data.a)
            };

            if (restGroupType && groupData.member.length < data.a) {
                if (
                    confirm(
                        '나머지 인원이 있습니다. 다른 조에 포함 시키겠습니까?'
                    )
                ) {
                    groupData.member.forEach(function(v, idx) {
                        resultObj[idx].member.push(v);
                    });
                    break;
                }
            }

            resultObj.push(groupData);
            i++;
        }

        const lastResult = $.extend(true, {}, resultObj);
        
        return lastResult;

        // $wrap.addClass('is_result');
        // modal.open(renderHtml(resultObj, onegroup));

        // _gameResultCommit();
    } catch (e) {
        console.log(e);
    }
}

const vStore = new Vuex.Store({
    state: {
        selectedGameId: 1,
        // 직원 목록
        memberList: [],
        // 결과 목록
        groupList: [],
        modal: {
            // 게임 결과 모달
            gameResult: false
        }
    },
    getters: {
        memberCount(state) {
            return state.memberList.length;
        },
        activeMemberCount(state) {
            var memberList = state.memberList;
            var max = memberList.length;
            var disable = memberList.filter(function (v) {
                if (v.isDisabled === true) {
                    return true;
                }
                return false;
            });
            
            return max - disable.length;
        }
    },
    mutations: {
        updateMessage(state, payload) {
            return state.message = payload;
        },
        getMemberList(state, payload) {
            // console.log(data);
            state.memberList = payload;
        },
        updateMember({memberList}, payload) {
            memberList[payload.index].isDisabled = true;
        },
        selectedGame(state, payload) {
            return state.selectedGameId = payload;
        },
        modalSwitch(state, {name, isShow}) {
            return state.modal[name] = isShow;
        },
        setGroupList(state, payload) {
            state.groupList = payload;
        },
        updateAllMember(state, payload) {
            const flag = payload;
            state.memberList.forEach(m => {
                m.isDisabled = flag;
            });
        }
    },
    actions: {
        startShuffle({commit, state}, payload) {
            function shuffle(memberList) {
                var remap = memberList.slice().filter(function(v) {
                    // 비활성 멤버 제외
                    if (v.is_disable) {
                        return false;
                    }
                    return true;
                });

                var j; // 임의의 수
                var x; // 임시 저장 공간
                var i; // 인원 수 (1씩 감소 됨)

                for (i = remap.length; i; i--) {
                    j = Math.floor(Math.random() * i); // 요기가 핵심
                    x = remap[i - 1]; // 마지막 직원을 임시 공간에 보냄
                    remap[i - 1] = remap[j]; // 마지막 직원 자리에 임의의 번호 직원이 대입됨
                    remap[j] = x; // 임의의 직원 있던 위치에 마지막 직원이 대입 됨
                    // 직원 수 만큼 반복
                }

                return remap;
            }
            
            const randombackpackr = shuffle(state.memberList);
            
            // var count = this.getValue('#groupMember') || 3;
            var count = 3;
            var groupCount = Math.ceil(randombackpackr.length / count);
            var data = {
                a: count, // 한조 인원
                b: groupCount, // 그룹 수
                c: randombackpackr // 랜덤 값
            };
            
            const resultData = buildResultData(data);
            commit('setGroupList', resultData);
        },
        getMemberList(context) {
            return api.getMemberList().then((res) => {
                res = res.map(item => {
                    item.isDisabled = false;
                    return item;
                });
                context.commit('getMemberList', res);
            });
        },
        updateAllMember({commit, state}, payload) {
            const flag = payload;
            return commit('updateAllMember', flag);
        },
        updateMember({commit, state}, mId) {
            let index = null;
            state.memberList.some((member, i) => {
                if (member.id === mId) {
                    index = i;
                    return true;
                }
            });
            return commit('updateMember', {
                index
            });
        },
        selectedGame({commit}, typeId) {
            return commit('selectedGame', typeId);
        },
        modalSwitch({commit}, payload) {
            return commit('modalSwitch', payload);
        }
    }
});

export default vStore;