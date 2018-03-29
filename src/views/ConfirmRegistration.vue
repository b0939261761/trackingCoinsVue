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
              | Подтверждение регистрации

            v-spacer
            v-btn(
              @click='onBack'
              flat
              small
              color="white"
            )
              | Назад

          v-card-text( v-show='alertConfirmed' )
            v-alert(
              v-model='alertConfirmed'
              :type='alertComfirmedType'
              dismissible
            )
              | {{ alertComfirmedText }}

          template( v-if='isConfirmed' )
            v-card-actions
              v-spacer
              v-btn(
                  @click='onGoHome'
                  color='primary'
                )
                  | Перейти на главную

          template( v-else )

            v-card-text( v-if='isSubmit' )
              v-alert(
                :type='alertSendType'
                value='true'
                transition='scale-transition'
                )
                  | {{ alertSendText }}

            template( v-else )
              v-card-text
                form( @submit.prevent='onSubmit' )
                  v-text-field(
                    label='E-mail',
                    v-model='email',
                    :error-messages="errors.collect('email')"
                    v-validate="{ required: true, email: true, uncheck_email: true }"
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
                    | Выслать
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
  }
};
</script>
