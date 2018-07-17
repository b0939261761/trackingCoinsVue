<template lang='pug'>

v-content
  v-container(
    fluid,
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
            v-toolbar-title( v-text='$t("toolbarTitle")' )

            v-spacer
            v-btn(
              @click='onBack'
              flat
              small
              color='white'
              v-text='$t("buttonBack")'
            )

            ChooseLang

          v-card-text

            v-text-field(
              v-focus
              data-focus
              :label='$t("password")'
              v-model='password'
              ref='password'
              @keyup.enter='$refs.passwordConfirm.focus( )'
              :append-icon='passVisible ? "visibility" : "visibility_off"'
              @click:append='passVisible = !passVisible'
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
              @click:append='passConfirmVisible = !passConfirmVisible'
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
                    @click='onSubmit'
                    color='primary'
                    :disabled='isDisabled'
                    block
                    v-text='$t("send")'
                  )
</template>

<script>

export default {
  props: {
    token: String
  },
  data: ( ) => ( {
    password: '',
    passwordConfirm: '',
    passVisible: false,
    passConfirmVisible: false,
    isSubmitProcess: false
  } ),
  computed: {
    isDisabled( ) {
      return this.isSubmitProcess || !this.password || !this.passwordConfirm ||
        !this.token || this.errors.any( );
    }
  },
  methods: {
    async onSubmit( ) {
      this.isSubmitProcess = true;

      if ( await this.$validator.validateAll( ) ) {
        const payload = { password: this.password, token: this.token };
        try {
          await this.$store.dispatch( 'auth/changePassword', payload );
          this.$router.push( { name: 'home' } );
        } catch ( error ) { };
      }

      this.isSubmitProcess = false;
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    }
  },
  i18n: {
    messages: {
      en: {
        toolbarTitle: 'New password'
      },
      ru: {
        toolbarTitle: 'Новый пароль'
      }
    }
  }
};
</script>
