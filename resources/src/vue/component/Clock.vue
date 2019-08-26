<template>
    <div @click="updateMsg">
         <!-- {{greeting}} -->
    </div>
</template>

<script>
export default {
    methods: {
        updateMsg() {
            this.$store.commit('updateMessage', '123');
        }
    },
}
</script>

<style lang="scss" scoped>
</style>