<template>
    <div class="layout-controller">
        <gameTypeList/>
        <gameController/>
        <gameStart/>
        <gameOption/>
    </div>
</template>

<script>
import gameTypeList from 'Component/GameTypeList';
import gameController from 'Component/GameController';
import gameStart from 'Component/GameStart';
import gameOption from 'Component/GameOption';

export default {
    components: {
        gameTypeList,
        gameController,
        gameStart,
        gameOption
    },
    computed: {
        selectedGameId() {
            return this.$store.state.selectedGameId
        }
    },
    methods: {
        showModal() {
            this.$store.dispatch('modalSwitch', {
                name: 'gameResult',
                isShow: true
            });
        },
    },
}
</script>

<style lang="scss" scoped>
</style>