<template>
    <div>
        <div 
            v-for="group in groupList"
            class="group item"
        >
            <div class="group title">
                {{group.title}}
            </div>
            <Member 
                v-for="member in group.member"
                :member="member"
            />
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Member from 'Component/Member';

export default {
    components: {
        Member,
    },
    computed: mapState(['groupList']),
}
</script>

<style lang="scss" scoped>
</style>