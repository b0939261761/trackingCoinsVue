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

          template( v-if='isSubmit' )
            v-card-text
              v-alert(
                :type='isSend ? "success" : "error"'
                :value='true'
                transition='scale-transition'
              )
                | {{ isSend ? $t( 'sendSuccess' ) : $t( 'sendFail' ) }}

            v-card-actions( v-if='isSend' )
              v-spacer
              v-btn(
                  @click='onGoHome'
                  color='primary'
                )
                  | {{ $t('buttonGoHome') }}

          template( v-else )
            v-card-text

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
                  @click='onSubmit'
                  color='primary'
                  :disabled='isDisabled'
                )
                  | {{ $t('buttonSubmit') }}
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
    isSubmit: false,
    isSend: false
  } ),
  computed: {
    isDisabled( ) {
      return !this.password || !this.passwordConfirm || !this.token || this.errors.any( );
    }
  },
  methods: {
    onSubmit( ) {
      this.$validator.validateAll( ).then( result => {
        if ( result ) {
          const payload = { password: this.password, token: this.token };
          this.$store.dispatch( 'auth/changePassword', payload )
            .then( status => {
              this.isSubmit = true;
              this.isSend = status;
              if ( status ) {
                this.timer = setTimeout( ( ) => this.onGoHome( ), 5000 );
              }
            } );
        }
      } );
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    },
    onGoHome( ) {
      this.$router.push( { name: 'home' } );
    }
  },
  beforeDestroy( ) {
    clearTimeout( this.timer );
  },
  i18n: {
    messages: {
      en: {
        toolbarTitle: 'New password',
        buttonSubmit: 'Save',
        sendSuccess: 'The password has been changed.',
        sendFail: 'The operation failed, please try again later.'
      },
      ru: {
        toolbarTitle: 'Новый пароль',
        buttonSubmit: 'Сохранить',
        sendSuccess: 'The password has been changed.',
        sendFail: 'Операция завершилась неудачно, попробуйте позже.'
      }
    }
  }
}
</script>
