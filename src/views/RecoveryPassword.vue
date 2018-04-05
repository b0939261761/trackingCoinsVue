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
              value='true'
              transition='scale-transition'
              )
                | {{ isSend ? $t( 'sendSuccess' ) : $t( 'sendFail' ) }}

          template( v-else )
            v-card-text
              form( @submit.prevent='onSubmit' )
                v-text-field(
                  :label='$t("email")',
                  v-model='email',
                  @keyup.enter='onSubmit'
                  :error-messages='errors.collect("email")'
                  v-validate='{ required: true, email: true, uncheck_email: true }'
                  data-vv-delay='500'
                  data-vv-name='email'
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
  props: ['token'],
  data: ( ) => ( {
    email: '',
    isSubmit: false,
    isSend: false
  } ),
  computed: {
    isDisabled( ) {
      return !this.email || this.errors.any( );
    }
  },
  methods: {
    onSubmit( ) {
      this.$validator.validateAll( ).then( result => {
        if ( result ) {
          this.$store.dispatch( 'auth/recoveryPassword', { email: this.email } )
            .then( status => {
              this.isSubmit = true;
              this.isSend = status;
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
        toolbarTitle: 'Password recovery',
        buttonSubmit: 'Send',
        sendSuccess: 'A letter with a recovery link has been sent to the email address.',
        sendFail: 'The operation failed, please try again later.'
      },
      ru: {
        toolbarTitle: 'Восстановить пароль',
        buttonSubmit: 'Выслать',
        sendSuccess: 'Письмо с ссылкой восстановления отправлено на email.',
        sendFail: 'Операция завершилась неудачно, попробуйте позже.'
      }
    }
  }
};
</script>
