<template lang='pug'>
v-snackbar(
  v-model='text'
  :color='color'
  :timeout=6000
)
  | {{ text }}
  v-btn(
    @click.native='onClose'
    dark
    flat
  )
    | Закрыть
</template>

<script>

export default {
  name: 'MessageBox',
  data( ) {
    return {
      timeout: 6000
    }
  },
  computed: {
    color( ) { this.$store.state.messageBox.text || 'info' },
    text: {
      get( ) {
        return this.$store.state.messageBox.text;
      },
      set( value ) {
        if ( !value ) this.$store.commit( 'setMessageBox' );
      }
    }
  },
  methods: {
    onClose( ) {
      this.text = false;
    }
  }

}
</script>
