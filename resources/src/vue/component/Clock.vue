<template>
    <div>
        {{greeting}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            greeting: 'hello tg'
        }
    },
}
</script>

<style lang="scss" scoped>
  div {
      border: 1px solid #f00;
  }
</style>