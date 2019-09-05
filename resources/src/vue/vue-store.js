import Vue from 'vue'
import Vuex from 'vuex'
import api from './api';

Vue.use(Vuex);

const vStore = new Vuex.Store({
    state: {
        selectedGameId: 1,
        // 직원 목록
        memberList: [],
        // 결과 목록
        groupList: [
            [
                {
                    name: '11',
                    team: '22'
                },
                {
                    name: '11',
                    team: '22'
                }
            ],
            [
                {
                    name: '33',
                    team: '22'
                },
                {
                    name: '44',
                    team: '22'
                }
            ]
        ],
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
            
            const result = shuffle(state.memberList);
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