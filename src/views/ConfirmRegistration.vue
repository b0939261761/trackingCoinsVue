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

          v-card-text( v-show='alertConfirmed' )
            v-alert(
              v-model='alertConfirmed'
              :type='isConfirmed ? "success" : "error"'
              dismissible
            )
              | {{ isConfirmed ? $t( 'confirmedSuccess' ) : $t( 'confirmedFail' ) }}

          template( v-if='isConfirmed' )
            v-card-actions
              v-spacer
              v-btn(
                  @click='onGoHome'
                  color='primary'
                )
                  | {{ $t('buttonGoHome') }}

          template( v-else )

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
  props: {
    token: String
  },
  data: ( ) => ( {
    alertConfirmed: true,
    email: '',
    isConfirmed: false,
    isSubmit: false,
    isSend: false
  } ),
  computed: {
    alertComfirmedType( ) {
      return this.isConfirmed ? 'success' : 'error';
    },
    alertComfirmedText( ) {
      return this.isConfirmed
        ? 'Аккаунт активирован.'
        : 'Ошибка при активации, попробуйте выслать подтверждение повторно.';
    },
    alertSendType( ) {
      return this.isSend ? 'success' : 'error';
    },
    alertSendText( ) {
      return this.isSend
        ? 'Письмо с ссылкой подтверждения отправлено на email.'
        : 'Операция завершилась неудачно, попробуйте позже.';
    },
    isDisabled( ) {
      return !this.email || this.errors.any( );
    }
  },
  methods: {
    onSubmit( ) {
      this.$validator.validateAll( ).then( result => {
        if ( result ) {
          this.$store.dispatch( 'auth/repeatConfirmation', { email: this.email } )
            .then( status => {
              this.alertConfirmed = false;
              this.isSubmit = true;
              this.isSend = status;
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
  created( ) {
    if ( this.$route.query ) history.replaceState( null, null, this.$route.path );

    if ( this.token ) {
      this.$store.dispatch( 'auth/confirmRegistration', { token: this.token } )
        .then( status => {
          this.isConfirmed = status;
          if ( status ) {
            this.timer = setTimeout( ( ) => this.onGoHome( ), 2000 );
          }
        } );
    }
  },
  beforeDestroy( ) {
    clearTimeout( this.timer );
  },
  i18n: {
    messages: {
      en: {
        toolbarTitle: 'Confirmation of registration',
        buttonSubmit: 'Send',
        confirmedSucces: 'The account has been activated.',
        confirmedFail: 'Activation error, please try sending confirmation again.',
        sendSuccess: 'A letter with a recovery link has been sent to the email address.',
        sendFail: 'The operation failed, please try again later.'
      },
      ru: {
        toolbarTitle: 'Подтверждение регистрации',
        buttonSubmit: 'Выслать',
        confirmedSucces: 'Аккаунт активирован.',
        confirmedFail: 'Ошибка при активации, попробуйте выслать подтверждение повторно.',
        sendSuccess: 'Письмо с ссылкой восстановления отправлено на email.',
        sendFail: 'Операция завершилась неудачно, попробуйте позже.'
      }
    }
  }
};
</script>
