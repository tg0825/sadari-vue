import Vue from 'vue'
import store from './vue-store.js'
import MemberList from 'Component/MemberList.vue'
import MemberCount from 'Component/MemberCount.vue'
import Clock from 'Component/Clock.vue'

Vue.config.productionTip = false

function main() {
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
    
    new Vue({
        el: '.member-list.number',
        store,
        render: function (h) {
            return h(MemberCount);
        }
    })
    
    new Vue({
        el: '.vue-clock',
        store,
        render: function (h) {
            return h(Clock);
        }
    })
}

main();
