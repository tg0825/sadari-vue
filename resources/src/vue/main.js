import Vue from 'vue'
import store from './vue-store.js'
import CardList from './component/CardList.vue'
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
                return h(CardList);
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
