import Vue from 'vue'
import store from '@/vue/vue-store.js'
import GameType from 'Component/GameType.vue'
import GameController from 'Component/GameController.vue'
import MemberList from 'Component/MemberList.vue'
import MemberCount from 'Component/MemberCount.vue'
import Clock from 'Component/Clock.vue'
import Modal from 'Component/Modal.vue'

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
    
    // 우측 게임 선택 영역
    new Vue({
        el: '.sadari-select',
        store,
        render: function (h) {
            return h(GameType);
        }
    })
    
    // 게임 컨트롤러
    new Vue({
        el: '.tab',
        store,
        render: function (h) {
            return h(GameController);
        }
    })
    
    // 결과 모달
    new Vue({
        el: '.modal',
        store,
        render: function (h) {
            return h(Modal);
        }
    })
}

main();
