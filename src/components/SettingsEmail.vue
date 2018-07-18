<template lang='pug'>

v-flex(
  xs12
  md6
)

  v-dialog(
    v-model='showDialog'
    persistent
    max-width='320'
  )
    v-card
      v-card-text(
        v-text='$t(isEmailSubmit ? "submitMessage" : "saveSettingsForEmail")'
      )
      v-card-actions
        v-spacer
        v-btn(
          v-if='!isEmailSubmit'
          color='red darken-1'
          flat
          @click='onClicksaveAndConfirmEmail'
          v-text='$t("saveAndConfirm")'
        )

        v-btn(
          flat
          @click='showDialog = false'
          v-text='isEmailSubmit ? "OK" : $t("cancel")'
        )

  v-card( height='100%' )
    v-card-title
      div
        span( class='grey--text headline') Email
    v-card-actions
      v-container(
        grid-list-md
        class='pt-0'
      )
        v-layout( wrap )
          v-flex( xs12 )
            v-text-field(
              :label='$t("email")'
              :value='email'
              @input='onInputEmail'
              :error-messages='emailError'
              :loading='loadingEmail'
            )

          v-flex(
            xs12
          )
            v-switch(
              v-if='emailActivated && !isEmailChange'
              :label='$t("emailEnabled")'
              :input-value='emailEnabled'
              @change='$emit("emailEnabled", $event)'
            )
            v-btn(
              v-else
              color='primary'
              v-text='$t("emailActivated")'
              @click='onClickEmailActivated'
              block
              :disabled='loadingEmail || !email || Boolean(emailError.length)'
            )
</template>

<script>
export default {
  name: 'SettingEmail',
  props: [
    'email',
    'emailEnabled',
    'isEmailChange',
    'emailActivated',
    'isSubmit'
  ],
  data: ( ) => ( {
    isEmailSubmit: false,
    waitingSaveSettings: false,
    loadingEmail: false,
    showDialog: false,
    emailError: []
  } ),
  computed: {
    hasError() { return this.errors.any( ); }
  },
  watch: {
    hasError( value ) { this.$emit( 'error', value ); },
    isSubmit( value ) {
      if ( value && this.waitingSaveSettings ) {
        this.waitingSaveSettings = false;
        this.onConfirmEmail( );
      }
    }
  },
  methods: {
    async onInputEmail( val ) {
      this.$emit( 'email', val );
      this.$nextTick( async ( ) => {
        if ( this.isEmailChange ) {
          this.loadingEmail = true;
          await this.$validator.validate( 'email', val );
        };
        this.emailError = this.errors.collect( 'email' );
        this.loadingEmail = false;
      } );
    },
    onClickEmailActivated( ) {
      if ( this.isEmailChange ) {
        this.isEmailSubmit = false;
        this.showDialog = true;
      } else {
        this.onConfirmEmail( );
      }
    },
    onClicksaveAndConfirmEmail( ) {
      this.$emit( 'submit' );
      this.waitingSaveSettings = true;
    },
    async onConfirmEmail( ) {
      const email = this.email;
      try {
        await this.$store.dispatch( 'auth/repeatConfirmation', { email } );
        this.isEmailSubmit = true;
        this.showDialog = true;
      } catch ( error ) { };
    }
  },
  created( ) {
    // For visible loading text field
    this.$validator.attach( {
      name: 'email',
      rules: { email: true, check_email: true },
      delay: 500
    } );
  },
  i18n: {
    messages: {
      en: {
        emailActivated: 'Email activated',
        saveSettingsForEmail: 'Save settings for email',
        submitMessage: 'A letter with a activation link has been sent to the email address.'
      },
      ru: {
        emailActivated: 'Активировать Email',
        saveSettingsForEmail: 'Сохраните настроки для активации Email',
        submitMessage: 'Письмо с ссылкой активации отправлено на email'
      }
    }
  }
};
</script>
