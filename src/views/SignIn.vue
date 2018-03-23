<template lang='pug'>
v-content
  v-container(
    fluid,
    fill-height
  )
    v-layout(
      align-center,
      justify-center
    )
      v-flex(
        xs12,
        sm8,
        md6
      )
        v-card
          v-toolbar(
            dark,
            color='primary'
          )
            v-toolbar-title
              | Reality Coins

            v-spacer
            v-btn(
              @click='onSignUp'
              flat
              small
              color="white"
            )
              | Регистрация

          v-card-text
            form( @submit.prevent='onSubmit' )

              v-text-field(
                label='E-mail',
                v-model='email',
                :error-messages="errors.collect('email')"
                v-validate="'required|email'"
                data-vv-name='email'
              )

              v-text-field(
                label='Пароль'
                v-model='password'
                :append-icon='passIcon'
                :append-icon-cb='passIconClick'
                :error-messages="errors.collect('password')"
                :type='passType'
                v-validate="'required'"
                data-vv-name='password'
                data-vv-as='Пароль'
              )

          v-card-actions
            v-container( grid-list-md )
              v-layout( row wrap )
                v-flex(
                  xs12
                  sm6
                  md5
                  lg4
                  color="primary"
                )
                  v-btn(
                    @click='onRecovery'
                    flat
                    block
                  )
                    | Ввостановить пароль

                v-spacer( class='hidden-xs-only' )
                v-flex(
                  xs12
                  sm4
                  md3
                  dark
                  color="primary"
                )
                  v-btn(
                    :disabled='isDisabled'
                    @click='onSubmit'
                    color='primary'
                    block
                  )
                    | Вход

                v-flex( xs12 )
                  v-alert(
                    type='error'
                    v-model='errorEnter'
                    transition='scale-transition'
                    dismissible
                  )
                    | 'Неверный еmail или пароль'
</template>

<script>
export default {
  data: ( ) => ( {
    email: '',
    password: '',
    passVisible: false,
    errorEnter: false
  } ),
  computed: {
    isDisabled( ) {
      return !this.email || !this.password || this.errors.any( );
    },
    passType( ) {
      return this.passVisible ? 'text' : 'password';
    },
    passIcon( ) {
      return this.passVisible ? 'visibility' : 'visibility_off'
    },
    passIconClick( ) {
      return ( ) => this.passVisible = !this.passVisible;
    }
  },
  methods: {
    onSubmit () {
      const { email, password } = this
      this.$store.dispatch( 'auth/signIn', { email, password } )
        .then( status => {
          if ( status ) {
            this.$router.push( { name: 'home' } )
          } else {
            this.errorEnter = true;
          }
        } );
    },
    onRecovery () {
      this.$router.push( { name: 'recoveryPassword' } )
    },
    onSignUp () {
      this.$router.push( { name: 'signUp' } )
    }
  }
}
</script>
