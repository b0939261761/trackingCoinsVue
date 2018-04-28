<template lang='pug'>
v-card( height='100%' )
  v-navigation-drawer(
    app
    fixed
    v-model='drawer'
    :clipped='$vuetify.breakpoint.mdAndUp'
    :permanent='$vuetify.breakpoint.mdAndUp'
     class='grey lighten-4'
  )
    v-list(
      dense
      class='grey lighten-4'
     )

      template( v-for='( item, index ) in drawerList' )
        v-divider(
          v-if='item.divider'
          dark
          class='my-3'
          :key='index'
        )

        v-list-tile(
          v-else
          :to='{ name: item.pathName }'
          :key='index'
          class='grey--text'
        )
          v-list-tile-action
            v-icon(
              v-if="item.icon"
              color='pink'
              v-text='item.icon'
            )

          v-list-tile-content( v-text='item.text' )

  v-toolbar(
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    app
  )
    v-toolbar-side-icon(
      v-if='$vuetify.breakpoint.smAndDown'
      @click.stop='drawer = !drawer'
    )

    v-toolbar-title( class='hidden-xs-only' ) Reality Coins
    v-spacer

    ChooseLang

    v-btn(
      icon
      @click='drewerNavigation("signIn")'
    )
      v-icon exit_to_app
  v-content( class='height-100' )
    v-container(
      fill-height
      fluid
    )
      v-layout(
        justify-center
        align-center

      )
        v-flex(
          fill-height
        )
          transition( name='fade' )
            router-view

  v-footer( app )
    span( class='px-3' )
      | &copy; {{ new Date().getFullYear() }}

</template>

<script>
export default {
  data: () => ( {
    drawer: true
  } ),
  computed: {
    drawerList( ) {
      return [
        { icon: 'monetization_on', text: 'Валютные пары', pathName: 'settings' },
        { icon: 'shopping_cart', text: 'Биржи', pathName: 'settings' },
        { icon: 'notifications', text: this.$t( 'notifications' ), pathName: 'notifications' },
        { icon: 'settings', text: this.$t( 'settings' ), pathName: 'settings' },
        { divider: true },
        { icon: 'help', text: 'Помощь', pathName: 'settings' },
        { divider: true },
        { icon: 'exit_to_app', text: 'Выход', pathName: 'signIn' }
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
  }
};
</script>
