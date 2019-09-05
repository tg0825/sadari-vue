<template>
    <div>
        <div 
            v-for="group in groupList"
            class="group item">
            <Member 
                v-for="member in group"
                :member="member"
            />
        </div>
    </div>
</template>

<script>
import Member from 'Component/Member';

export default {
    components: {
        Member,
    },
    computed: {
        groupList() {
            return this.$store.state.groupList;
        }
    },
    methods: {
        // getMemberList() {
        //     this.$store.dispatch('getMemberList');
        // }
    },
    mounted() {
        // this.getMemberList();
    }
}
</script>

<style lang="scss" scoped>
</style>