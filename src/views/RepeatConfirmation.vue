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
                  :label='$t("email")'
                  v-model='email'
                  @keyup.enter='onSubmit'
                  :error-messages='errors.collect("email")'
                  @input='onCheckEmail'
                  :loading='loadingEmail'
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
                      color='primary'
                      block
                      v-text='$t("send")'
                    )
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  name: 'RepeatConfirmation',
  data: ( ) => ( {
    email: '',
    isSubmit: false,
    loadingEmail: false,
    isSubmitProcess: false
  } ),
  computed: {
    isDisabled( ) {
      return this.isSubmitProcess || !this.email || this.errors.any( );
    }
  },
  methods: {
    async onSubmit( ) {
      this.isSubmitProcess = true;
      const email = this.email;
      if ( await this.$validator.validateAll( { email } ) ) {
        try {
          await this.$store.dispatch( 'auth/repeatConfirmation', { email } );
          this.isSubmit = true;
        } catch ( error ) { };
      }
      this.isSubmitProcess = false;
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
      rules: { required: true, email: true, uncheck_email: true }
    } );
  },
  i18n: {
    messages: {
      en: {
        toolbarTitle: 'Create account',
        submitMessage: 'A letter with a recovery link has been sent to the email address.'
      },
      ru: {
        toolbarTitle: 'Регистрация',
        submitMessage: 'Письмо с ссылкой восстановления отправлено на email.'
      }
    }
  }
};
</script>
