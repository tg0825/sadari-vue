<template>
    <div class="start-root">
        <button 
            @click="startGame"
            class="start" 
            type="submit"
        >시작!</button>
    </div>
</template>

<script>
export default {
    components: {
        // Member,
    },
    computed: {
    },
    data() {
        return {
        }
    },
    methods: {
        startGame() {
            this.$store.dispatch('startShuffle', 1);
            this.$store.dispatch('modalSwitch', {
                name: 'gameResult',
                isShow: true
            });
        },
    },
}
</script>

<style lang="scss" scoped></style>