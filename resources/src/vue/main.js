import Vue from 'vue'
import Store from './vue-store.js'
import CardList from './component/CardList.vue'
import Clock from './component/Clock.vue'

function main() {
    function cardList() {
        $.get('/member')
        .done(function(res) {
            var res = JSON.parse(res);
            new Vue({
                el: '.member-list.body',
                data: {
                    privateState: {},
                    sharedState: Store.state,
                },
                render: function (h) {
                    return h(CardList, {
                        props: {
                            cardList: res,
                        }
                    });
                }
            })
        });
    }
    
    function clock() {
        new Vue({
            el: '.vue-clock',
            data: {
                privateState: {},
                sharedState: Store.state
            },
            render: function (h) {
                return h(Clock, {
                    props: {
                        hour: 1,
                        seconds: 2
                    }
                });
            }
        })
    }
    
    cardList();
    clock();
}

main();
