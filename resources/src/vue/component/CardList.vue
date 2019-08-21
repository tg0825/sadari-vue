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
    components: {
        Card,
    },
    computed: {
        message() {
            return this.$store.state.message;
        },
        cardList() {
            return this.$store.state.memberList;
        }
    },
    methods: {
        getMember() {
            this.$store.dispatch('getMember');
        }
    },
    mounted() {
        this.getMember();
    }
}
</script>

<style lang="scss" scoped>
</style>