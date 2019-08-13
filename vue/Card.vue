<template>
    <div>
        <div>
            card {{index[0]}}
        </div>
        <div>
            card {{index[1]}}
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            index: [
                1,
                2
            ]
        }
    },
}
</script>

<style scoped>
    div {
        border: 1px solid #f00;
    }
</style>