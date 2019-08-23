<template>
    <!-- <div class="sadari-select">
        <div>
            <button 
                class="btn ta-l"
                data-game="one"
                data-game-id="1"
            >
                <i class="fa fa-users" aria-hidden="true"></i>
                한명 뽑기 (또는 여러명)
            </button>
        </div>
        <div>
            <button
                class="btn ta-l"
                data-game="jo_member"
                data-game-id="2"
            >
                <i class="fa fa-random" aria-hidden="true"></i>
                랜덤 조 (인원기준)
            </button>
        </div>
        <div>
            <button 
                class="btn ta-l" 
                data-game="jo_team"
                data-game-id="3"
            >
                <i class="fa fa-random" aria-hidden="true"></i>
                랜덤 조 (팀 기준)
            </button>
        </div>
        <div>
            <button
                class="btn ta-l"
                data-game="jo_lunch"
                data-game-id="4"
            >
                <i class="fa fa-cutlery" aria-hidden="true"></i>
                랜덤 점심
            </button>
        </div>
        <div>
            <button 
                class="btn ta-l"
                data-game="ju"
                data-game-id="6"
            >
                <i class="fa fa-hand-paper-o" aria-hidden="true"></i>
                손
            </button>
        </div>
        <div>
            <button 
                class="btn ta-l"
                data-game="ju"
                data-game-id="5"
            >
                <i class="fa fa-trash" aria-hidden="true"></i>
                청소 뽑기
            </button>
        </div>
    </div> -->
    
    <div>
        <div 
            v-for="game in gameData"
        >
            <!-- <button 
                class="btn ta-l"
                data-game="ju"
                data-game-id="5"
            > -->
            <button
                class="btn ta-l"
                :game="game.idName"
                :id="game.id"
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
    // computed: {
    //     message() {
    //         return this.$store.state.message;
    //     },
    //     memberList() {
    //         return this.$store.state.memberList;
    //     }
    // },
    data() {
        return {
            gameData
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