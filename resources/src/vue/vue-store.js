import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

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
            return axios.get('/member').then((res) => {
                var result = res.data;
                // state.member = result;
                context.commit('getMember', result);
            });
        }
    }
});

export default vStore;