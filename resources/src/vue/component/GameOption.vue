<template>
    <div class="option-btn-list">
        <div>
            <label class="btn btn-s btn-base">
                <input
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
        _handleClick(evt) {
        }
    },
}
</script>

<style lang="scss" scoped>
</style>