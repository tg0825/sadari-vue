<template>
    <div class="member-list body">
        <Member 
            v-for="member in memberList"
            :member="member"
        />
    </div>
</template>

<script>
import Member from './Member.vue';

export default {
    components: {
        Member,
    },
    computed: {
        message() {
            return this.$store.state.message;
        },
        memberList() {
            return this.$store.state.memberList;
        }
    },
    methods: {
        getMemberList() {
            this.$store.dispatch('getMemberList');
        }
    },
    mounted() {
        this.getMemberList();
    }
}
</script>

<style lang="scss" scoped>
</style>