<template>
    <div>
        <div 
            @click="open"
        >open</div>
        <div 
            v-if="showModal"
            @click="close"
        >
            modal
        </div>
    </div>
</template>

<script>
export default {
    name: 'member',
    props: {
    },
    data() {
        return {
            showModal: false
        }
    },
    computed: {
    },
    methods: {
        open() {
            this.showModal = true;
        },
        close() {
            this.showModal = false;
        }
    },
}
</script>

<style lang="scss" scoped>
</style>