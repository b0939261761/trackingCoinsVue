<template lang='pug'>
v-card( height='100%' )
  v-card-text
    v-container( grid-list-lg )
      v-dialog(
        v-model='showRemove'
        persistent
        max-width='310'
      )
        v-card
          v-card-text( v-text='$t("messageRemove")' )
          v-card-actions
            v-spacer
            v-btn(
              color='red darken-1'
              flat
              @click='onRemove'
              v-text='"OK"'
            )

            v-btn(
              flat
              @click='showRemove = false'
              v-text='$t("cancel")'
            )

      v-dialog(
        v-model='showSaveSettings'
        persistent
        max-width='310'
      )
        v-card
          v-card-text( v-text='$t("messageSaveSettings")' )
          v-card-actions
            v-spacer
            v-btn(
              color='red darken-1'
              flat
              @click='onClickSaveAndGoBot'
              v-text='$t("saveAndGo")'
            )

            v-btn(
              flat
              @click='showSaveSettings = false'
              v-text='$t("cancel")'
            )

      v-layout
        v-flex(
          xs12
          sm5
          md3
        )
          v-btn(
            block
            @click='showRemove = true'
            v-text='$t("userRemove")'
          )

      v-layout
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

      v-layout( wrap )
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
            @keyup.enter='$refs.telegramUsername.focus( )'
            :append-icon='passConfirmVisible ? "visibility" : "visibility_off"'
            :append-icon-cb='( ) => passConfirmVisible = !passConfirmVisible'
            :error-messages='errors.collect("passwordConfirm")'
            :type='passConfirmVisible ? "text" : "password"'
            v-validate='{ confirmed: "password" }'
            data-vv-name='passwordConfirm'
          )

      v-layout( wrap )
        v-flex(
          xs12
          md6
        )
          v-text-field(
            :label='$t("telegramUsername")'
            v-model='telegramUsername'
            ref='telegramUsername'
            @keyup.enter='onSubmit'
            :error-messages='errors.collect("telegramUsername")'
            v-validate='{ max: 32, regex: /^\\w+$/ }'
            data-vv-name='telegramUsername'
          )

        v-flex(
          xs12
          md6
        )
          v-text-field(
            v-if='telegramActivated && !isTelegramUsernameChange'
            :label='$t("telegramFullName")'
            v-model='telegramFullName'
            readonly
          )
          v-btn(
            v-else
            color='primary'
            v-text='$t("telegramActivated")'
            @click='onClickTelegramActivated'
            block
          )

        v-flex(
          xs12
          md6
        )
          v-switch(
            :label='$t("emailEnabled")'
            v-model='emailEnabled'
          )

        v-flex(
          xs12
          md6
        )
          v-switch(
            :label='$t("telegramEnabled")'
            v-model='telegramEnabled'
          )

      v-layout( v-if='isSubmit' )
        v-flex
          v-alert(
              type='success'
              v-model='isSubmit'
              transition='scale-transition'
              dismissible
            )
              | {{ $t('submitMessage') }}

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

const telegramBotLink = `https://t.me/${ process.env.NODE_ENV === 'production' ? 'CryptonotBot' : 'CryptonotTestBot' }`;

export default {
  data: ( ) => ( {
    lang: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    emailEnabled: false,
    telegramUsername: '',
    telegramFullName: '',
    telegramActivated: false,
    telegramEnabled: false,
    passVisible: false,
    passConfirmVisible: false,
    isSubmit: false,
    loadingEmail: false,
    showRemove: false,
    showSaveSettings: false,
    telegramBotLink
  } ),
  computed: {
    ...mapState( {
      langStore: state => state.lang,
      usernameStore: state => state.username,
      emailStore: state => state.email,
      emailEnabledStore: state => state.emailEnabled,
      telegramUsernameStore: state => state.telegramUsername,
      telegramFullNameStore: state => state.telegramFullName,
      telegramActivatedStore: state => state.telegramActivated,
      telegramEnabledStore: state => state.telegramEnabled
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
    isEmailEnabled( ) {
      return this.emailEnabled !== this.emailEnabledStore;
    },
    isTelegramUsernameChange( ) {
      return this.telegramUsername !== this.telegramUsernameStore;
    },
    isTelegramEnabledChange( ) {
      return this.telegramEnabled !== this.telegramEnabledStore;
    },
    isSubmitDisabled( ) {
      return !( this.isEmailChange || this.isUsernameChange ||
             this.isLangChange || this.password ||
             this.isEmailEnabled || this.isTelegramUsernameChange ||
             this.isTelegramEnabledChange ) || this.errors.any( );
    }
  },
  methods: {
    ...mapActions( [ 'userUpdate', 'userRemove' ] ),
    async onSubmit( ) {
      const { email, isEmailChange } = this;
      const result = await this.$validator.validateAll( { ...isEmailChange ? { email } : null } );
      if ( result ) {
        const data = { };
        if ( this.isUsernameChange ) data.username = this.username;
        if ( this.isEmailChange ) data.email = email;
        if ( this.password ) data.password = this.password;
        if ( this.isLangChange ) data.lang = this.lang;
        if ( this.isEmailEnabled ) data.email_enabled = this.emailEnabled;
        if ( this.isTelegramEnabledChange ) data.telegram_enabled = this.telegramEnabled;
        if ( this.isTelegramUsernameChange ) {
          data.telegram_username = this.telegramUsername;
          data.telegram_activated = false;
        }

        try {
          await this.userUpdate( data );
          this.isSubmit = true;
        } catch ( error ) { }
      }
    },
    onGoTelegramBot( ) {
      window.open( this.telegramBotLink );
    },
    onClickTelegramActivated( ) {
      if ( this.isTelegramUsernameChange ) {
        this.showSaveSettings = true;
      } else {
        this.onGoTelegramBot( );
      }
    },
    async onClickSaveAndGoBot( ) {
      this.showSaveSettings = false;
      await this.onSubmit( );
      this.onGoTelegramBot( );
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    },
    onCancel( ) {
      this.setLocalUserInfo( );
    },
    async onRemove( ) {
      try {
        await this.userRemove( );
        this.$router.push( { name: 'signIn' } );
      } catch ( error ) { }
    },
    setLocalUserInfo( ) {
      this.lang = this.langStore;
      this.username = this.usernameStore;
      this.email = this.emailStore;
      this.password = this.passwordConfirm = '';
      this.emailEnabled = this.emailEnabledStore;
      this.telegramUsername = this.telegramUsernameStore;
      this.telegramFullName = this.telegramFullNameStore;
      this.telegramActivated = this.telegramActivatedStore;
      this.telegramEnabled = this.telegramEnabledStore;
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
        submitMessage: 'Success.',
        userRemove: 'Remove Accaunt',
        telegramActivated: 'Activated Telegram',
        messageRemove: 'Are you sure you want to delete this account?',
        messageSaveSettings: 'Save settings for telegram bot'
      },
      ru: {
        submitMessage: 'Сохранено.',
        userRemove: 'Удалить профиль',
        telegramActivated: 'Активировать Telegram',
        messageRemove: 'Вы уверенны в удалении пользователя?',
        messageSaveSettings: 'Сохраните настроки для активации бота в Telegram'
      }
    }
  }
};
</script>
