import Vue from 'vue'
import Vuex from 'vuex'
import api from './api';

Vue.use(Vuex);

const vStore = new Vuex.Store({
    state: {
        message: '1',
        member: [],
    },
    mutations: {
        updateMessage(state, payload) {
            return state.message = payload;
        },
        getMember(state, payload) {
            // console.log(data);
            state.member = payload;
        }
    },
    actions: {
        getMember(context) {
            return api.getMember().then((res) => {
                context.commit('getMember', res);
            });
        }
    }
});

export default vStore;