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
              | {{ $t('toolbarTitle') }}

            v-spacer

            v-btn(
              @click='onBack'
              flat
              small
              color='white'
            )
              | {{ $t('buttonBack') }}

            ChooseLang

          v-card-text( v-if='isSubmit' )
            v-alert(
                :type='isSend ? "success" : "error"'
                :value='true'
                transition='scale-transition'
              )
                | {{ isSend ? $t( 'sendSuccess' ) : $t( 'sendFail' ) }}

          template( v-else )
            v-card-text
              form( @submit.prevent='onSubmit' )

                v-text-field(
                  :label='$t("username")',
                  v-model='username',
                  @keyup.enter='$refs.email.focus( )'
                  :error-messages='errors.collect("username")'
                  v-validate='{ required: true, min: 5, max: 30, alpha: true }'
                  data-vv-name='username'
                )

                v-text-field(
                  :label='$t("email")',
                  v-model='email',
                  ref='email'
                  @keyup.enter='$refs.password.focus( )'
                  :error-messages='errors.collect("email")'
                  v-validate='{ required: true, email: true, check_email: true }'
                  data-vv-delay='500'
                  data-vv-name='email'
                )

                v-text-field(
                  :label='$t("password")'
                  v-model='password'
                  ref='password'
                  @keyup.enter='$refs.passwordConfirm.focus( )'
                  :append-icon='passVisible ? "visibility" : "visibility_off"'
                  :append-icon-cb='( ) => passVisible = !passVisible'
                  :error-messages='errors.collect("password")'
                  :type='passVisible ? "text" : "password"'
                  name='password'
                  v-validate='{ required: true, min: 5, max: 30, regex: /^\\S+$/ }'
                  data-vv-name='password'
                )

                v-text-field(
                  :label='$t("passwordConfirm")'
                  v-model='passwordConfirm'
                  ref='passwordConfirm'
                  @keyup.enter='onSubmit'
                  :append-icon='passConfirmVisible ? "visibility" : "visibility_off"'
                  :append-icon-cb='( ) => passConfirmVisible = !passConfirmVisible'
                  :error-messages='errors.collect("passwordConfirm")'
                  :type='passConfirmVisible ? "text" : "password"'
                  v-validate='{ confirmed: "password" }'
                  data-vv-name='passwordConfirm'
                )

            v-card-actions
                v-spacer
                v-btn(
                    :disabled='isDisabled'
                    @click='onSubmit'
                    color='primary'
                  )
                    | {{ $t('buttonSubmit') }}
</template>

<script>
export default {
  data: ( ) => ( {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passVisible: false,
    passConfirmVisible: false,
    isSubmit: false,
    isSend: true
  } ),
  computed: {
    isDisabled( ) {
      return !this.username || !this.email || !this.password || !this.passwordConfirm || this.errors.any( );
    }
  },
  methods: {
    onSubmit( ) {
      this.$validator.validateAll( ).then( result => {
        if ( result ) {
          const { username, email, password } = this;
          this.$store.dispatch( 'auth/signUp', { username, email, password } )
            .then( status => {
              this.isSend = status;
              this.isSubmit = true;
            } );
        }
      } );
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
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
};
</script>
