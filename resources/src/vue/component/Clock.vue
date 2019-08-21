<template>
    <div @click="updateMsg">
         click
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
  // div {
  //     border: 1px solid #f00;
  // }
</style>