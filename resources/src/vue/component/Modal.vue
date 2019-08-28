<template>
    <div 
        v-show="isShowModal"
        @click="_handleClickClose"
    >
        modal
    </div>
</template>

<script>
export default {
    name: 'modal-game-result',
    computed: {
        isShowModal() {
            return this.$store.state.modal.gameResult
        }
    },
    methods: {
        _handleClickClose() {
            this.$store.dispatch('modalSwitch', {
                name: 'gameResult',
                isShow: false
            });
        }
    },
}
</script>

<style lang="scss" scoped>
</style>