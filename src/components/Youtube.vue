<template lang='pug'>

    div( class='wrapper_player')
      iframe(
        class='player'
        :src='`https://www.youtube.com/embed/${videoUrl}`'
      )
</template>

<script>
export default {
  props: {
    videoUrl: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.wrapper_player {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.player {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
