<template>
    <div
        class="sadari-select"
    >
        <div 
            v-for="game in gameTypeData"
        >
            <button
                class="btn ta-l"
                :class="{
                    is_on: computedSelectedGameId == game.id
                }"
                :game="game.idName"
                :id="game.id"
                @click="_handleClick"
            >
                <i v-html="game.icon"></i>
                {{game.name}}
            </button>
        </div>
    </div>
</template>

<script>
import gameTypeData from '@/vue/gameTypeData.js';

export default {
    components: {
        // Member,
    },
    computed: {
        computedSelectedGameId() {
            return this.$store.state.selectedGameId;
        },
    },
    data() {
        return {
            gameTypeData,
            selectedGameId: this.$store.state.selectedGameId
        }
    },
    methods: {
        _handleClick(evt) {
            var typeId = evt.currentTarget.id;
            this.$store.dispatch('selectedGame', typeId);
            this.selectedId = typeId;
        }
    },
    mounted() {
        // this.selectedGameId = this.$store.state.selectedGameId;
        // this.selectedId = 1;
    }
}
</script>

<style lang="scss" scoped>
</style>