<template>
    <div class="member-list body">
        {{message}}
        <Card 
            v-for="card in cardList"
            :card="card"
            :key="card.id"
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
            return this.$store.state.member;
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