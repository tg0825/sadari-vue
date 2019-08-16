<template>
    <div>
        <Title message="hi"></Title>
        <Card 
            v-for="card in cardListItem"
            :card="card"
        />
    </div>
</template>

<script>
import Card from './Card.vue';
import Title from './Title.vue';

export default {
    name: 'CardList',
    props: [
        'cardListItem'
    ],
    data () {
        return {
            greeting: 'hello tg',
        }
    },
    components: {
        Card,
        Title
    }
}
</script>

<style lang="scss" scoped>
  div {
      h2 {
        font-size: 40px;
        color: mediumseagreen;
      }
  }
</style>