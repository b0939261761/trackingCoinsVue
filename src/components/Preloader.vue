<template lang='pug'>
v-container(
  v-show='isShow'
  fluid,
  fill-height
  class='preloader'
)
  v-layout(
    align-center,
    justify-center
  )
    v-progress-circular(
      indeterminate
      :size="70"
      :width="7"
      color='purple'
    )
</template>

<script>
export default {
  name: 'Preloader',
  computed: {
    isShow( ) {
      return this.$store.state.isLoader;
    }
  }
};
</script>

<style scoped>
.preloader {
  position: fixed;
  background-color: rgba( 238, 238, 238, 0.5 )
}
</style>
