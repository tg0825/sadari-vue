import Vue from 'vue'
import CardList from './component/CardList.vue'
import Clock from './component/Clock.vue'

let id = 1;

new Vue({
    el: '#app',
    render: function (h) {
        return h(CardList, {
            props: {
                cardListItem: [
                    {
                        id: id++,
                        text: 'yoon'
                    },
                    {
                        id: id++,
                        text: 'kim'
                    },
                    {
                        id: id++,
                        text: 'pack'
                    },
                ]
            }
        });
    }
})

new Vue({
    el: '.vue-clock',
    render: function (h) {
        return h(Clock, {
            props: {
                hour: 1,
                seconds: 2
            }
        });
    }
})
