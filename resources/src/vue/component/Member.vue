<template>
    <label
        :class="labelClass"
        :style="{backgroundColor:member.team_color}"
        data-team-eng="member.team_eng"
        data-team-color="member.team_color"
        >
        <input 
            @click="_handleClick"
            type="checkbox" class="js-all-check-item"
        />
        <span class="name">{{member.name}}</span>
        <span class="team">{{member.team}}</span>
        <span class="position">{{member.position}}</span>
    </label>
</template>

<script>
export default {
    name: 'member',
    props: {
        member: {
            type: Object,
            required: true
        }
    },
    computed: {
        labelClass() {
            return {
                'member-list': true,
                'member': true,
                is_disable: this.member.isDisabled
            }
        }
    },
    methods: {
        _handleClick: function (evt) {
            const mId = this.member.id;
            this.$store.dispatch('updateMember', mId);
        }
    },
}
</script>

<style lang="scss" scoped>
</style>