<template lang='pug'>
v-app(
  id='app'
  :dark='false'
)

  transition( name='fade' )
    router-view

  Preloader
  Error
</template>

<script>
import Preloader from '@/components/Preloader';
import Error from '@/components/Error';

export default {
  components: {
    Preloader,
    Error
  }
};
</script>

<style>
body {
  font-family: Roboto, sans-serif;
}

.height-100 {
  height: 100%;
}

.p-relative {
  position: relative;
}

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

img {
  height: 100%;
}
</style>
