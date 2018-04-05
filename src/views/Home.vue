<template lang='pug'>
v-card( height='100%' )
  v-navigation-drawer(
    app
    fixed
    v-model='drawer'
    :clipped='$vuetify.breakpoint.smAndUp'
    :permanent='$vuetify.breakpoint.smAndUp'
  )
    v-list( dense )
      v-list-tile(
        v-for='( item, index ) in drawerList'
        @click='drewerNavigation(item.pathName)'
        :key='index'
      )
        v-list-tile-action
          v-icon(
            v-if="item.icon"
            color="pink"
            v-text='item.icon'
          )

        v-list-tile-content( v-text='item.text' )

  v-toolbar(
    color='blue darken-3'
    dark
    :clipped-left="$vuetify.breakpoint.smAndUp"
    app
  )
    v-toolbar-side-icon( @click.stop='drawer = !drawer' )
    v-toolbar-title( class='white--text hidden-xs-only' ) Reality Coins
    v-spacer

    ChooseLang

    v-btn(
      icon
      @click='drewerNavigation("signIn")'
    )
      v-icon exit_to_app
  v-content
    v-container(
    )
      v-layout(
        justify-center
        align-center
      )
        v-flex(
          xs12,
          sm8,
          md6
        )
          transition( name='fade' )
            router-view

  v-btn(
      fab
      bottom
      right
      color='pink'
      dark
      fixed
      @click.prevent=''
  )
    v-icon add
</template>

<script>
export default {
  data: () => ( {
    drawer: true
  } ),
  computed: {
    drawerList( ) {
      return [
        { icon: 'monetization_on', text: 'Валютные пары' },
        { icon: 'shopping_cart', text: 'Биржи' },
        { icon: 'notifications', text: 'Уведомления' },
        { icon: 'settings', text: this.$t( 'settings' ), pathName: 'settings' },
        { icon: 'help', text: 'Помощь' },
        { icon: 'exit_to_app', text: 'Выход', click: 'onLogOut' }
      ];
    }
  },
  methods: {
    onLogOut( ) {
      this.$router.push( { name: 'signIn' } );
    },

    drewerNavigation( pathName ) {
      if ( pathName ) this.$router.push( { name: pathName } );
    }
  },
  i18n: {
    messages: {
      en: {
        toolbarTitle: 'Create account',
        buttonSubmit: 'Sign Up',
        sendSuccess: 'A confirmation email has been sent to your email address.',
        sendFail: 'Registration failed, please try again later.'
      },
      ru: {
        toolbarTitle: 'Регистрация',
        buttonSubmit: 'Зарегистрироваться',
        sendSuccess: 'Письмо с ссылкой подтверждения отправлено на email.',
        sendFail: 'Регистрация завершилась неудачно, попробуйте позже.'
      }
    }
  }
}
</script>
