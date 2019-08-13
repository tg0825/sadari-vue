<template>
    <div>
        <h2>cardList {{greeting}}</h2>
        <Card></Card>
    </div>
</template>

<script>
import Card from './Card.vue';
export default {
    data () {
        return {
            greeting: 'hello'
        }
    },
    components: {
        Card
    }
}
</script>

<style scoped>
  h2 {
    font-size: 40px;
    color: mediumseagreen;
  }
</style>