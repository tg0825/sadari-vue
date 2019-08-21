<template>
    <label
        :class="labelClass"
        :style="{backgroundColor:card.team_color}"
        data-team-eng="card.team_eng"
        data-team-color="card.team_color"
        >
        <input 
            @click="_handleClick"
            type="checkbox" class="js-all-check-item"
        />
        <span class="name">{{card.name}}</span>
        <span class="team">{{card.team}}</span>
        <span class="position">{{card.position}}</span>
    </label>
</template>

<script>
export default {
    name: 'card',
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    computed: {
        labelClass() {
            return {
                'member-list': true,
                'member': true,
                is_disable: this.card.isDisabled
            }
        }
    },
    methods: {
        _handleClick: function (evt) {
            const mId = this.card.id;
            this.$store.dispatch('updateMember', mId);
        }
    },
}
</script>

<style lang="scss" scoped>
    .card {
        float:left;
        border: 1px solid #f00;
    }
</style>