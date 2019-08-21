<template>
    <div class="card">
        card {{message}}
    </div>
</template>

<script>
export default {
    props: [
        'message'
    ],
}
</script>

<style lang="scss" scoped>
    .title {
        font-size:20px;
    }
</style>