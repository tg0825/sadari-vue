<template>
    <div>
        <div 
            v-for="game in gameData"
        >
            <button
                class="btn ta-l"
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
import gameData from '@/vue/gameData.js';

export default {
    components: {
        // Member,
    },
    computed: {
        selectedGameId() {
            return this.$store.state.selectedGameId;
        },
    },
    data() {
        return {
            gameData
        }
    },
    methods: {
        _handleClick(evt) {
            var typeId = evt.currentTarget.id;
            this.$store.dispatch('selectedGame', typeId);
        }
    },
    mounted() {
        // this.getMemberList();
    }
}
</script>

<style lang="scss" scoped>
</style>