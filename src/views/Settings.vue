<template lang='pug'>
v-card( height='100%' )
  v-card-text
    v-layout( row )
      v-flex( xs5 )
        span( v-text='$t("notificationLanguage")' )
        v-radio-group(
          v-model='lang'
          :row='$vuetify.breakpoint.smAndUp'
        )
          v-radio(
            v-for='(item, index) in languages'
            :key='index'
            primary
            :label='item.title'
            :value='item.lang'
          )

    v-container( grid-list-lg )
      v-layout(
        row
        wrap
      )
        v-flex(
          xs12
          md6
        )
          v-text-field(
            v-focus
            data-focus
            :label='$t("username")'
            v-model='username'
            @keyup.enter='$refs.email.focus( )'
            :error-messages='errors.collect("username")'
            v-validate='{ min: 5, max: 30, alpha: true }'
            data-vv-name='username'
          )

        v-flex(
          xs12
          md6
        )
          v-text-field(
            :label='$t("email")'
            v-model='email'
            ref='email'
            @keyup.enter='$refs.password.focus( )'
            :error-messages='errors.collect("email")'
            @input='onInputEmail'
            :loading='loadingEmail'
          )

        v-flex(
          xs12
          md6
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
            v-validate='{ min: 5, max: 30, regex: /^\\S+$/ }'
            data-vv-name='password'
          )

        v-flex(
          xs12
          md6
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

      v-layout( v-if='isSend' )
        v-flex
          v-alert(
            v-model='alertConfirmed'
            :type='isConfirmed ? "success" : "error"'
            dismissible
          )
            | {{ isConfirmed ? $t("confirmedSuccess") : $t("confirmedFail") }}

  v-card-actions
    v-container( grid-list-md )
      v-layout( wrap )

        v-spacer( class='hidden-xs-only' )

        v-flex(
          xs12
          sm5
          md3
        )
          v-btn(
            block
            flat
            @click='onCancel'
            v-text='$t("cancel")'
          )

        v-flex(
          xs12
          sm5
          md3
        )
          v-btn(
            block
            flat
            color='primary'
            @click='onSubmit'
            :disabled='isSubmitDisabled'
            v-text='$t("save")'
          )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers( 'user' );

export default {
  data: ( ) => ( {
    lang: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passVisible: false,
    alertConfirmed: true,
    passConfirmVisible: false,
    isSend: false,
    isConfirmed: false,
    loadingEmail: false
  } ),
  computed: {
    ...mapState( {
      langStore: state => state.lang,
      usernameStore: state => state.username,
      emailStore: state => state.email
    } ),
    languages( ) {
      return this.$store.state.languages;
    },
    isEmailChange( ) {
      return this.email !== this.emailStore;
    },
    isUsernameChange( ) {
      return this.username !== this.usernameStore;
    },
    isLangChange( ) {
      return this.lang !== this.langStore;
    },
    isSubmitDisabled( ) {
      return !( this.isEmailChange || this.isUsernameChange ||
             this.isLangChange || this.password ) || this.errors.any( );
    }
  },
  methods: {
    ...mapActions( [ 'userUpdate' ] ),
    async onSubmit( ) {
      const { email, isEmailChange } = this;
      const result = await this.$validator.validateAll( { ...isEmailChange ? { email } : null } );
      if ( result ) {
        const data = { };
        if ( this.isUsernameChange ) data.username = this.username;
        if ( isEmailChange ) data.email = email;
        if ( this.password ) data.password = this.password;
        if ( this.lang !== this.langStore ) data.lang = this.lang;

        const status = await this.userUpdate( data );
        this.isSend = true;
        this.isConfirmed = status;
      }
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    },
    onCancel( ) {
      this.setLocalUserInfo( );
    },
    setLocalUserInfo( ) {
      this.lang = this.langStore;
      this.username = this.usernameStore;
      this.email = this.emailStore;
      this.password = this.passwordConfirm = '';
    },
    async onInputEmail( val ) {
      if ( this.isEmailChange ) {
        this.loadingEmail = true;
        await this.$validator.validate( 'email', val );
      };
      this.loadingEmail = false;
    }
  },
  created( ) {
    this.setLocalUserInfo( );

    // For visible loading text field
    this.$validator.attach( {
      name: 'email',
      rules: { required: true, email: true, check_email: true },
      delay: 500
    } );
  },
  i18n: {
    messages: {
      en: {
        confirmedSuccess: 'Success.',
        confirmedFail: 'The operation failed, please try again later.'
      },
      ru: {
        confirmedSuccess: 'Сохранено.',
        confirmedFail: 'Ошибка, попробуйте сохранить повторно.'
      }
    }
  }
};
</script>
