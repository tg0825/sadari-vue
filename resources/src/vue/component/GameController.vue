<template>
    <div
        class="tab"
    >
        <div 
            v-show="selectedGameId == 0"
            class="tab-item">
            <div class="form-block">
                딱!
                <input class="ta-r" id="onlyOne" name="onlyOne" type="number" value="1">
                명만 뽑기
            </div>
        </div>

        <div 
            v-show="selectedGameId == 1"
            class="tab-item">
            <div class="form-block">
                <label for=""></label>
                한 조당
                <input class="ta-r" id="groupMember" name="groupMember" type="number" value="3">
                명
            </div>
        </div>

        <div 
            v-show="selectedGameId == 2"
            class="tab-item">
            <div class="form-block">
                <label for=""></label>
                총
                <input class="ta-r" id="randomCount" name="randomCount" type="number" value="9">
                개 조 만들기
            </div>
        </div>
        
        <div 
            v-show="selectedGameId == 3"
            class="tab-item">
            <div class="form-block">
                <label for=""></label>
                총
                <input class="ta-r" id="groupCount" name="groupCount" type="number" value="10">
                개 조 만들기
            </div>
        </div>
        
        <div 
            v-show="selectedGameId == 4"
            class="tab-item js-tab-ju" 
            data-tab-id="son">
            <div class="tab-item-result"></div>
            <div class="ju-add">
                <div class="form-block">
                    <div class="input-text">
                        <input id="name" name="name" type="text" placeholder="이름" maxlength="10">
                    </div>
                    <button type="submit" class="btn-add-mem">추가</button>
                </div>
            </div>
        </div>
        
        <div 
            v-show="selectedGameId == 5"
            class="tab-item js-tab-ju" 
            data-tab-id="juList">
            <div class="tab-item-result"></div>
            <div class="ju-add">
                <div class="form-block">
                    <div class="input-text">
                        <input id="name" name="name" type="text" placeholder="청소 항목 추가" maxlength="10">
                    </div>
                    <button type="submit" class="btn-add-mem">추가</button>
                </div>
            </div>
            <div class="mt10">
                <div class="form-block">
                    <button 
                        type="button"
                        class="btn btn-s btn-size-w exclude-prev-member"
                    >
                        <i class="fas fa-history"></i>
                        이전 청소자 표시
                    </button>
                </div>
            </div>
        </div>
        
        <div @click="showModal">
            open modal
        </div>
    </div>
</template>

<script>
export default {
    components: {
        // Member,
    },
    computed: {
        selectedGameId() {
            return this.$store.state.selectedGameId
        }
    },
    methods: {
        showModal() {
            console.log(1);
        },
        _handleClick(evt) {
            // var typeId = evt.currentTarget.id;
            // this.$store.dispatch('selectedGame', typeId);
            // this.selectedId = typeId;
        }
    },
    mounted() {
        // this.getMemberList();
    }
}
</script>

<style lang="scss" scoped>
</style>