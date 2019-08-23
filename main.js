import Vue from 'vue'
import store from '@/vue/vue-store.js'
import GameType from 'Component/GameType.vue'
import MemberList from 'Component/MemberList.vue'
import MemberCount from 'Component/MemberCount.vue'
import Clock from 'Component/Clock.vue'

// import './resources/dist/vue/style.css';
// require('./resources/dist/vue/style.css');

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
    
    // 우측 게임 선택 영역
    new Vue({
        el: '.sadari-select',
        store,
        render: function (h) {
            return h(GameType);
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
