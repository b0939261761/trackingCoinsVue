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
              color='white'
            )
              | {{ $t('buttonSignUp') }}

            ChooseLang

          v-card-text
            form( @submit.prevent='onSubmit' )

              v-text-field(
                :label='$t("email")',
                v-model='email',
                @keyup.enter='$refs.password.focus( )'
                :error-messages='errors.collect("email")'
                v-validate='{ required: true, email: true }'
                data-vv-name='email'
              )

              v-text-field(
                :label='$t("password")'
                v-model='password'
                @keyup.enter='onSubmit'
                ref='password'
                :append-icon='passVisible ? "visibility" : "visibility_off"'
                :append-icon-cb='( ) => this.passVisible = !this.passVisible'
                :error-messages='errors.collect("password")'
                :type='passVisible ? "text" : "password"'
                v-validate='{ required: true, min: 5, max: 30, regex: /^\\S+$/ }'
                data-vv-name='password'
              )

          v-card-actions
            v-container( grid-list-md )
              v-layout( row wrap )
                v-flex(
                  xs12
                  sm6
                  md5
                  lg4
                  color='primary'
                )
                  v-btn(
                    @click='onRecovery'
                    flat
                    block
                  )
                    | {{ $t("recoveryPassword") }}

                v-spacer( class='hidden-xs-only' )
                v-flex(
                  xs12
                  sm4
                  md3
                  dark
                  color='primary'
                )
                  v-btn(
                    :disabled='isDisabled'
                    @click='onSubmit'
                    color='primary'
                    block
                  )
                    | {{ $t('buttonSubmit') }}

                v-flex( xs12 )
                  v-alert(
                    type='error'
                    v-model='errorEnter'
                    transition='scale-transition'
                    dismissible
                  )
                    | {{ $t('errorEnter') }}
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
    }
  },
  methods: {
    onSubmit( ) {
      this.$validator.validateAll( ).then( result => {
        if ( result ) {
          const { email, password } = this;
          this.$store.dispatch( 'auth/signIn', { email, password } )
            .then( status => {
              if ( status ) {
                this.$router.push( { name: 'home' } );
              } else {
                this.errorEnter = true;
              }
            } );
        }
      } );
    },
    onRecovery( ) {
      this.$router.push( { name: 'recoveryPassword' } );
    },
    onSignUp( ) {
      this.$router.push( { name: 'signUp' } );
    }
  },
  i18n: {
    messages: {
      en: {
        buttonSignUp: 'Sign Up',
        buttonSubmit: 'Login',
        recoveryPassword: 'Forgot your password?',
        errorEnter: 'Incorrect еmail or password'
      },
      ru: {
        buttonSignUp: 'Регистрация',
        buttonSubmit: 'Вход',
        recoveryPassword: 'Восстановить пароль',
        errorEnter: 'Неверный еmail или пароль.'
      }
    }
  }
};
</script>
