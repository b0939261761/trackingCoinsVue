<template lang='pug'>
v-menu(
  bottom
  left
  offset-y
)
  v-btn(
    icon
    slot='activator'
  )
    img( :src='langImage' )

  v-list
    v-list-tile(
      avatar
      v-for='(lang, index) in languagesWithoutActive'
      :key='index'
      @click='onChangeLang(lang.lang)'
    )
      v-list-tile-avatar( tile )
        img( :src='lang.image' )

      v-list-tile-content
        v-list-tile-title {{ lang.title }}

      v-list-tile-action
        v-icon(
          color='pink'
          v-text='lang.icon'
        )
</template>

<script>
import { loadLanguageAsync } from '@/lang/';

export default {
  name: 'Preloader',
  computed: {
    langImage( ) {
      return this.$store.getters.langImage;
    },
    languagesWithoutActive( ) {
      return this.$store.getters.languagesWithoutActive;
    }

  },
  methods: {
    onChangeLang( lang ) {
      loadLanguageAsync( lang );
    }
  }
};
</script>
