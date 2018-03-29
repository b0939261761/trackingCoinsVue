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
              | Ввостановление пароля

            v-spacer
            v-btn(
              @click='onBack'
              flat
              small
              color="white"
            )
              | Назад

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
  props: ['token'],
  data: ( ) => ( {
    email: '',
    isSubmit: false,
    isSend: false
  } ),
  computed: {
    alertSendType( ) {
      return this.isSend ? 'success' : 'error';
    },
    alertSendText( ) {
      return this.isSend
        ? 'Письмо с ссылкой восстановления отправлено на email.'
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
  }
};
</script>
