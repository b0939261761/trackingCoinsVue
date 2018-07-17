<template lang='pug'>
v-content
  v-container(
    fluid
    fill-height
  )
    v-layout(
      align-center
      justify-center
    )
      v-flex(
        xs12
        sm8
        md6
      )
        v-card
          v-toolbar(
            dark
            color='primary'
          )

            img(
              class='logo'
              src='cryptonot_178x100.png'
            )

            v-spacer
            v-btn(
              @click='onSignUp'
              flat
              small
              color='white'
              v-text='$t("buttonSignUp")'
            )

            ChooseLang

          v-card-text
            form( @submit.prevent='onSubmit' )

              v-text-field(
                v-focus
                data-focus
                :label='$t("email")'
                v-model='email'
                ref='email'
                @keyup.enter='$refs.password.focus( )'
                :error-messages='errors.collect("email")'
                v-validate='{ email: true }'
                data-vv-name='email'
                prepend-icon='email'
                :disabled='Boolean(telegramUsername)'
              )

              v-text-field(
                :label='$t("telegramUsername")'
                v-model='telegramUsername'
                ref='telegramUsername'
                @keyup.enter='$refs.password.focus( )'
                :error-messages='errors.collect("telegramUsername")'
                v-validate='{ max: 32, regex: /^\\w+$/ }'
                data-vv-name='telegramUsername'
                prepend-icon='alternate_email'
                :disabled='Boolean(email)'
              )

              v-text-field(
                :label='$t("password")'
                v-model='password'
                @keyup.enter='onSubmit'
                ref='password'
                :append-icon='passVisible ? "visibility" : "visibility_off"'
                @click:append='this.passVisible = !this.passVisible'
                :error-messages='errors.collect("password")'
                :type='passVisible ? "text" : "password"'
                v-validate='{ required: true, min: 5, max: 30, regex: /^\\S+$/ }'
                data-vv-name='password'
              )

          v-card-actions
            v-container( grid-list-md )
              v-layout( wrap )
                v-flex(
                  xs12
                  sm6
                  md5
                )
                  v-btn(
                    @click='onRecovery'
                    flat
                    block
                    v-text='$t("recoveryPassword")'
                  )

                v-spacer( class='hidden-xs-only' )
                v-flex(
                  xs12
                  sm4
                  md3
                )
                  v-btn(
                    :disabled='isDisabled'
                    @click='onSubmit'
                    color='primary'
                    block
                    v-text='$t("buttonSubmit")'
                  )
</template>

<script>
export default {
  data: ( ) => ( {
    email: '',
    telegramUsername: '',
    password: '',
    passVisible: false
  } ),
  computed: {
    isDisabled( ) {
      return ( !this.email && !this.telegramUsername ) || !this.password || this.errors.any( );
    }
  },
  methods: {
    async onSubmit( ) {
      this.isSubmitProcess = true;
      if ( await this.$validator.validateAll( ) ) {
        const { email, telegramUsername, password } = this;
        try {
          await this.$store.dispatch( 'auth/signIn', { email, telegramUsername, password } );
          this.$router.push( { name: 'home' } );
        } catch ( error ) {
          this.email = '';
          this.telegramUsername = '';
          this.password = '';
          setTimeout( () => this.errors.clear( ), 0 );
        }
      }

      this.isSubmitProcess = true;
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
