<template lang='pug'>
  v-app( id='app' )
    transition( name='fade' )
      router-view

    Preloader
</template>


<script>
import Preloader from '@/components/Preloader'

export default {
  components: {
    Preloader
  }
}
</script>

<style>
.alert {
  width: 100%;
  text-align: left;
}


.fade-leave,
.fade-leave-to,
.fade-leave-active {
  display: none;
}

.fade-enter {
  opacity: 0 !important;
}

.fade-enter-active {
  transition: opacity .7s !important;
}

.fade-enter-to {
  opacity: 1 !important;
}

</style>
