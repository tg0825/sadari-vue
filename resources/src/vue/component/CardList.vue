<template>
    <div class="member-list body">
        <Card 
            v-for="card in cardList"
            :card="card"
        />
    </div>
</template>

<script>
import Card from './Card.vue';
            
export default {
    name: 'CardList',
    props: [
        'cardList',
    ],
    components: {
        Card,
    },
    data() {
        return {
            // foo: this.cardList
        }
    },
    mounted() {
        // console.log(this.$data.foo);
        // console.log(this.$props);
        // console.log(this.$root.$data);
        // console.log(this.$root.$data.setMessageAction('11'));
        // console.log(this.$root.$data);
        // console.log(this.$el.$ata);
    }
}
</script>

<style lang="scss" scoped>
</style>