<template>
    <label
        class="member-list member"
        :style="{backgroundColor:card.team_color}"
        data-member-id="card.id"
        data-team-eng="card.team_eng"
        data-team-color="card.team_color"
        >
        <input 
            @click.capture="_handleClick"
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
    props: [
        'card'
    ],
    data () {
        return {
            foo: 1
        }
    },
    methods: {
        _handleClick: function (ev) {
            console.log(this);
            console.log(ev);
        }
    },
    mounted() {
        // console.log('mounted!')
    }
}
</script>

<style lang="scss" scoped>
    .card {
        float:left;
        border: 1px solid #f00;
    }
</style>