<template>
    <span class="member-list number">
        {{activeMemberCount}}
        /
        {{memberCount}}
    </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'memberCount',
    computed: mapGetters(['activeMemberCount', 'memberCount'])
    // computed: {
    //     ...mapGetters([
    //         'activeMemberCount',
    //         'memberCount'
    //     ]),
        // maxCount() {
        //     return this.$store.state.memberList.length;
        // },
    // }
}
</script>

<style lang="scss" scoped>
    .member-list.number {
        margin-top: 8px;
        margin-right: 10px;
        float: left;
        font-size: 20px;
        color: #262626;
        font-weight: normal;
    }

    .member-list.number:before {
        font-size: 20px;
        display: inline-block;
        font-family: 'Font Awesome 5 Free';
        content: '\f183';
        vertical-align: baseline;
        margin-right: 4px;
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        font-weight: 900;
    }
</style>