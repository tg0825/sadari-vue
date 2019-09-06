<template>
    <div class="member-list body">
        <Member 
            v-for="member in memberList"
            :member="member"
        />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Member from 'Component/Member';

export default {
    components: {
        Member,
    },
    computed: mapState(['memberList']),
    methods: mapActions(['getMemberList']),
    mounted() {
        this.getMemberList();
    }
}
</script>

<style lang="scss" scoped>
</style>