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
            v-toolbar-title( v-text='$t("toolbarTitle")')
            v-spacer
            v-btn(
              @click='onBack'
              flat
              small
              color='white'
              v-text='$t("buttonBack")'
            )

            ChooseLang

          v-card-text( v-if='isSubmit' )
            v-alert(
                type='success'
                :value='true'
                transition='scale-transition'
              )
                | {{ $t('submitMessage') }}

          template( v-else )
            v-card-text
              form( @submit.prevent='onSubmit' )

                v-text-field(
                  v-focus
                  data-focus
                  :label='$t("username")'
                  v-model='username'
                  @keyup.enter='$refs.email.focus( )'
                  :error-messages='errors.collect("username")'
                  v-validate='{ required: true, min: 5, max: 30, alpha_num: true }'
                  data-vv-name='username'
                )

                v-text-field(
                  :label='$t("email")'
                  v-model='email'
                  ref='email'
                  @keyup.enter='$refs.password.focus( )'
                  :error-messages='errors.collect("email")'
                  @input='onCheckEmail'
                  :loading='loadingEmail'
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
              v-container
                v-layout

                  v-spacer

                  v-flex(
                    xs12
                    sm7
                    md5
                  )
                    v-btn(
                      :disabled='isDisabled'
                      @click='onSubmit'
                      block
                      color='primary'
                      v-text='$t("buttonSubmit")'
                    )
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  data: ( ) => ( {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passVisible: false,
    passConfirmVisible: false,
    isSubmit: false,
    loadingEmail: false,
    isSubmitProcess: false
  } ),
  computed: {
    isDisabled( ) {
      return this.isSubmitProcess || !this.username || !this.email ||
        !this.password || !this.passwordConfirm || this.errors.any( );
    }
  },
  methods: {
    async onSubmit( ) {
      this.isSubmitProcess = true;
      const { username, email, password } = this;
      if ( await this.$validator.validateAll( { email } ) ) {
        try {
          await this.$store.dispatch( 'auth/signUp', { username, email, password } );
          this.isSubmit = true;
        } catch ( error ) { };
      };
      this.isSubmitProcess = true;
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    },
    onCheckEmail: debounce( async function ( val ) {
      this.loadingEmail = true;
      await this.$validator.validate( 'email', val );
      this.loadingEmail = false;
    }, 1000 )
  },
  created( ) {
    // For visible loading text field
    this.$validator.attach( {
      name: 'email',
      rules: { required: true, email: true, check_email: true }
    } );
  },
  i18n: {
    messages: {
      en: {
        toolbarTitle: 'Create account',
        buttonSubmit: 'Sign Up',
        submitMessage: 'A confirmation email has been sent to your email address.'
      },
      ru: {
        toolbarTitle: 'Регистрация',
        buttonSubmit: 'Зарегистрироваться',
        submitMessage: 'Письмо с ссылкой подтверждения отправлено на email.'
      }
    }
  }
};
</script>
