<template lang='pug'>
v-card
  v-navigation-drawer(
    app
    fixed
    v-model='drawer'
    clipped
  )
    v-list( dense )
      v-list-tile(
        v-for='( item, index ) in drawerList'
        @click=''
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
    clipped-left
    app
  )
    v-toolbar-side-icon( @click.stop='drawer = !drawer' )
    v-toolbar-title( class='white--text hidden-xs-only' ) Reality Coins
    v-spacer
    v-btn(
      icon
      @click='onLogOut'
    )
      v-icon exit_to_app
  v-content
    v-container(
      fluid
      fill-height
    )
      v-layout(
        justify-center
        align-center
      )

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
      drawer: true,
      drawerList: [
        { icon: 'monetization_on', text: 'Валютные пары' },
        { icon: 'shopping_cart', text: 'Биржи' },
        { icon: 'notifications', text: 'Уведомления' },
        { icon: 'settings', text: 'Настройки' },
        { icon: 'help', text: 'Помощь' },
        { icon: 'exit_to_app', text: 'Выход', click: 'onLogOut' }
      ],
  } ),
  methods: {
    onLogOut( ) {
      this.$router.push( { name: 'signIn' } );
    }
  }

}
</script>
