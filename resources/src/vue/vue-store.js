import Vue from 'vue'
import Vuex from 'vuex'
import api from './api';

Vue.use(Vuex);

const vStore = new Vuex.Store({
    state: {
        // 직원 목록
        memberList: [],
    },
    mutations: {
        updateMessage(state, payload) {
            return state.message = payload;
        },
        getMember(state, payload) {
            // console.log(data);
            state.memberList = payload;
        },
        updateMember({memberList}, payload) {
            memberList[payload.index].isDisabled = true;
        }
    },
    actions: {
        getMember(context) {
            return api.getMember().then((res) => {
                res = res.map(item => {
                    item.isDisabled = false;
                    return item;
                });
                context.commit('getMember', res);
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
        }
    }
});

export default vStore;