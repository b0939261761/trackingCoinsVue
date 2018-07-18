<template lang='pug'>
v-flex(
  xs12
  md6
)

  v-dialog(
    v-model='showDialog'
    persistent
    max-width='310'
  )
    v-card
      v-card-text( v-text='$t("saveSettingsForTelegram")' )
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
          @click='showDialog = false'
          v-text='$t("cancel")'
        )

  v-card
    v-card-title
      div
        span( class='grey--text headline') Telegram
    v-card-actions
      v-container(
        grid-list-md
        class='pt-0'
      )
        v-layout( wrap )
          v-flex( xs12 )
            v-tooltip(
              top
              v-model='telegramTooltip'
              :disabled='!telegramTooltip'
            )
              span( v-text='$t("telegramTooltip")' )

              v-text-field(
                slot='activator'
                :label='$t("telegramUsername")'
                :value='telegramUsername'
                @input='onInputTelegramUsername'
                :loading='loadingTelegramUsername'
                :error-messages='telegramUsernameError'
                prepend-icon='alternate_email'
                append-icon='live_help'
                @click:append='telegramTooltip = true'
              )

          v-flex( xs12 )
            v-text-field(
              v-if='telegramActivated && !isTelegramUsernameChange'
              :label='$t("telegramFullName")'
              :value='telegramFullName'
              readonly
            )
            v-btn(
              v-else
              color='primary'
              v-text='$t("telegramActivated")'
              @click='onClickActivated'
              block
              :disabled='loadingTelegramUsername || !telegramUsername || Boolean(telegramUsernameError.length)'
            )

          v-flex(
            xs12
            md6
          )
            v-switch(
              :label='$t("telegramEnabled")'
              :input-value='telegramEnabled'
              @change='$emit("telegramEnabled", $event)'
            )
</template>

<script>
export default {
  name: 'SettingsTelegram',
  props: [
    'telegramUsername',
    'telegramEnabled',
    'telegramActivated',
    'isTelegramUsernameChange',
    'telegramFullName',
    'isSubmit'
  ],
  data: ( ) => ( {
    loadingTelegramUsername: false,
    telegramUsernameError: [ ],
    showDialog: false,
    telegramTooltip: false,
    waitingSaveSettings: false
  } ),
  computed: {
    hasError() { return this.errors.any( ); }
  },
  watch: {
    hasError( value ) { this.$emit( 'error', value ); },
    isSubmit( value ) {
      if ( value && this.waitingSaveSettings ) {
        this.waitingSaveSettings = false;
        this.onGoTelegramBot( );
      }
    }
  },
  methods: {
    onGoTelegramBot( ) {
      window.open( `https://t.me/${ process.env.VUE_APP_TELEGRAM_BOT }` );
    },
    onClickActivated( ) {
      if ( this.isTelegramUsernameChange ) {
        this.showDialog = true;
      } else {
        this.onGoTelegramBot( );
      }
    },
    onClickSaveAndGoBot( ) {
      this.showDialog = false;
      this.$emit( 'submit' );
      this.waitingSaveSettings = true;
    },
    async onInputTelegramUsername( val ) {
      this.$emit( 'telegramUsername', val );
      this.$nextTick( async ( ) => {
        if ( this.isTelegramUsernameChange ) {
          this.loadingTelegramUsername = true;
          await this.$validator.validate( 'telegramUsername', val );
        };
        this.telegramUsernameError = this.errors.collect( 'telegramUsername' );
        this.loadingTelegramUsername = false;
      } );
    }
  },
  created( ) {
    // For visible loading text field
    this.$validator.attach( {
      name: 'telegramUsername',
      rules: { max: 32, regex: /^\w+$/, check_telegram: true },
      delay: 500
    } );
  },
  i18n: {
    messages: {
      en: {
        telegramActivated: 'Activated Telegram',
        saveSettingsForTelegram: 'Save settings for telegram bot',
        telegramTooltip: 'Telegram -> Settings -> Username (after @)'
      },
      ru: {
        telegramActivated: 'Активировать Telegram',
        saveSettingsForTelegram: 'Сохраните настроки для активации бота в Telegram',
        telegramTooltip: 'Телеграм -> Настройки -> Имя пользователя (после знака @)'
      }
    }
  }
};
</script>
