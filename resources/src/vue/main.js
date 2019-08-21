import Vue from 'vue'
import store from './vue-store.js'
import MemberList from './component/MemberList.vue'
import Clock from './component/Clock.vue'

Vue.config.productionTip = false

function main() {
    function cardList() {
        new Vue({
            el: '.member-list.body',
            data: {
                privateState: {},
                sharedState: store.state,
            },
            store,
            render: function (h) {
                return h(MemberList);
            }
        })
    }
    
    function clock() {
        new Vue({
            el: '.vue-clock',
            store,
            render: function (h) {
                return h(Clock);
            }
        })
    }
    
    cardList();
    clock();
}

main();
