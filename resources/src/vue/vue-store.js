import Vue from 'vue'
import Vuex from 'vuex'
import api from './api';

Vue.use(Vuex);

const vStore = new Vuex.Store({
    state: {
        // 직원 목록
        memberList: [],
        selectedGameId: 1,
        modal: {
            // 게임 결과 모달
            gameResult: false
        }
    },
    getters: {
        activeMemberCount: function (state) {
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