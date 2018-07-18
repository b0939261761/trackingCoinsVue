<template lang='pug'>
v-card( height='100%' )
  v-card-text
    v-container( grid-list-lg )
      v-layout( wrap )

        SettingsUserInfo(
          :username='username'
          @username='username = $event'
          :password='password'
          @password='password = $event'
          @error='errorUserInfo = $event'
        )

        SettingsOther(
          :lang='lang'
          @lang='lang = $event'
        )

        SettingsEmail(
          :email='email'
          @email='email = $event'
          :emailEnabled='emailEnabled'
          @emailEnabled='emailEnabled = $event'
          :isEmailChange='isEmailChange'
          :emailActivated='emailActivated'
          :isSubmit='isSubmit'
          @submit='onSubmit'
          @error='errorEmail = $event'
        )

        SettingsTelegram(
          :telegramUsername='telegramUsername'
          @telegramUsername='telegramUsername = $event'
          :telegramEnabled='telegramEnabled'
          @telegramEnabled='telegramEnabled = $event'
          :isTelegramUsernameChange='isTelegramUsernameChange'
          :telegramActivated='telegramActivated'
          :telegramFullName='telegramFullName'
          :isSubmit='isSubmit'
          @submit='onSubmit'
          @error='errorTelegram = $event'
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
import SettingsUserInfo from '@/components/SettingsUserInfo';
import SettingsOther from '@/components/SettingsOther';
import SettingsEmail from '@/components/SettingsEmail';
import SettingsTelegram from '@/components/SettingsTelegram';

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers( 'user' );

export default {
  name: 'Settings',
  components: {
    SettingsUserInfo,
    SettingsOther,
    SettingsEmail,
    SettingsTelegram
  },
  data: ( ) => ( {
    username: '',
    email: '',
    password: '',
    errorUserInfo: false,
    lang: '',

    emailEnabled: false,
    emailActivated: false,
    errorEmail: false,

    telegramUsername: '',
    telegramFullName: '',
    telegramActivated: false,
    telegramEnabled: false,
    errorTelegram: false,

    isSubmit: false
  } ),
  computed: {
    ...mapState( {
      langStore: state => state.lang,
      usernameStore: state => state.username,
      emailStore: state => state.email,
      emailActivatedStore: state => state.emailActivated,
      emailEnabledStore: state => state.emailEnabled,
      telegramUsernameStore: state => state.telegramUsername,
      telegramFullNameStore: state => state.telegramFullName,
      telegramActivatedStore: state => state.telegramActivated,
      telegramEnabledStore: state => state.telegramEnabled
    } ),
    isEmailChange( ) { return this.email !== this.emailStore; },
    isUsernameChange( ) { return this.username !== this.usernameStore; },
    isLangChange( ) { return this.lang !== this.langStore; },
    isEmailEnabled( ) { return this.emailEnabled !== this.emailEnabledStore; },
    isTelegramUsernameChange( ) { return this.telegramUsername !== this.telegramUsernameStore; },
    isTelegramEnabledChange( ) { return this.telegramEnabled !== this.telegramEnabledStore; },
    isSubmitDisabled( ) {
      return !( this.isEmailChange || this.isUsernameChange ||
             this.isLangChange || this.password ||
             this.isEmailEnabled || this.isTelegramUsernameChange ||
             this.isTelegramEnabledChange ) || this.errorUserInfo ||
             this.errorEmail || this.errorTelegram;
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
        if ( this.isEmailChange ) {
          data.email = email;
          data.email_activated = false;
        }
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
          this.setLocalUserInfo( );
        } catch ( error ) { }
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
      this.emailActivated = this.emailActivatedStore;
      this.emailEnabled = this.emailEnabledStore;
      this.telegramUsername = this.telegramUsernameStore;
      this.telegramFullName = this.telegramFullNameStore;
      this.telegramActivated = this.telegramActivatedStore;
      this.telegramEnabled = this.telegramEnabledStore;
    }
  },
  created( ) {
    this.setLocalUserInfo( );
  },
  i18n: {
    messages: {
      en: {
        submitMessage: 'Success'
      },
      ru: {
        submitMessage: 'Сохранено'
      }
    }
  }
};
</script>
