<template lang='pug'>
v-card( height='100%' )
  v-card-text
    v-container( grid-list-lg )
      v-layout( wrap )
        v-flex(
          xs12
        )
          v-btn(
            outline
            color='primary'
            :href='urlSupport'
            target='_blank'
          )
            img(
              :src='telegramApp'
              class='button__icon'
            )
            |  {{ $t("support") }}

        v-flex(
          xs12
          md6
        )
          Youtube( :videoUrl='$t("websiteRegistarion")' )

        v-flex(
          xs12
          md6
        )
          Youtube( :videoUrl='$t("telegramRegistarion")' )
</template>

<script>
import telegramApp from '@/assets/telegram-app.svg';
import Youtube from '@/components/Youtube';

export default {
  name: 'Help',
  data: ( ) => ( {
    telegramApp,
    urlSupport: `https://t.me/${ process.env.VUE_APP_TELEGRAM_SUPPORT }`
  } ),
  components: {
    Youtube
  },
  i18n: {
    messages: {
      en: {
        websiteRegistarion: 'EdsBifS25V0',
        telegramRegistarion: 'O70LBJpEBwQ'
      },
      ru: {
        websiteRegistarion: 'kZQ7UegfrzI',
        telegramRegistarion: '_DZp0dCbq_4'
      }
    }
  }

};
</script>

<style>
.button__icon {
  padding: 3px;
}
</style>
