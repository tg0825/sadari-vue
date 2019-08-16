<template>
    <div>
        {{card.text}}
    </div>
</template>

<script>
export default {
    props: [
        'card'
    ],
    mounted() {
        console.log('mounted!')
    }
}
</script>

<style lang="scss" scoped>
    .card {
        float:left;
        border: 1px solid #f00;
    }
</style>