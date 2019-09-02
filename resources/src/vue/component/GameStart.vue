<template>
    <div class="start-root">
        <button 
            @click="showModal"
            class="start" type="submit"
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
        showModal() {
            this.$store.dispatch('modalSwitch', {
                name: 'gameResult',
                isShow: true
            });
        },
    },
}
</script>

<style lang="scss" scoped></style>