<template>
    <div class="option-btn-list">
        <div>
            <label class="btn btn-s btn-base">
                <input
                    @click="_handleClick"
                    type="checkbox"
                    class="js-all-check-master"
                    name=""
                    value=""
                >
                전체선택
            </label>
        </div>
        <div>
            <button type="button" class="js-split-view btn btn-s btn-base">
                <i class="va-m fa fa-list" aria-hidden="true"></i>
                랜덤 대상자 확인
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    components: {
        // Member,
    },
    computed: {
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions([
            'updateAllMember'
        ]),
        _handleClick(evt) {
            const target = evt.currentTarget;
            const checked = target.checked;
            this.updateAllMember(checked);
        }
    },
}
</script>

<style lang="scss" scoped>
</style>