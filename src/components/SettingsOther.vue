<template lang='pug'>
v-flex(
  xs12
  md6
)
  v-dialog(
    v-model='showDialog'
    persistent
    max-width='310'
  )
    v-card
      v-card-text( v-text='$t("messageRemove")' )
      v-card-actions
        v-spacer
        v-btn(
          color='red darken-1'
          flat
          @click='onRemove'
          v-text='"OK"'
        )

        v-btn(
          flat
          @click='showDialog = false'
          v-text='$t("cancel")'
        )

  v-card
    v-container( grid-list-md )
      v-card-actions
        v-layout( wrap )
          v-flex( xs12 )
            span( v-text='$t("notificationLanguage")' )
            v-radio-group(
              :value='lang'
              @change='$emit("lang", $event)'
            )
              v-radio(
                v-for='(item, index) in languages'
                :key='index'
                primary
                :label='item.title'
                :value='item.lang'
              )

          v-flex( xs12 )
            v-btn(
              block
              @click='showDialog = true'
              v-text='$t("userRemove")'
            )
</template>

<script>
export default {
  name: 'SettingOther',
  props: [ 'lang' ],
  data: ( ) => ( {
    showDialog: false
  } ),
  computed: {
    languages( ) {
      return this.$store.state.languages;
    }
  },
  methods: {
    async onRemove( ) {
      try {
        await this.$store.user.userRemove( );
        this.$router.push( { name: 'signIn' } );
      } catch ( error ) { }
    }
  },
  i18n: {
    messages: {
      en: {
        userRemove: 'Remove Account',
        messageRemove: 'Are you sure you want to delete this account?'
      },
      ru: {
        userRemove: 'Удалить профиль',
        messageRemove: 'Вы уверенны в удалении пользователя?'
      }
    }
  }
};
</script>
