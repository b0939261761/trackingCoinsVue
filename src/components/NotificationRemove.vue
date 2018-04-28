<template lang='pug'>
v-dialog(
  v-model='show'
  persistent
  max-width='310'
)
  v-card
    v-card-text( v-text='$t("message")' )
    v-card-actions
      v-spacer
      v-btn(
        color='red darken-1'
        flat
        @click='$emit("save")'
        v-text='"OK"'
      )

      v-btn(
        flat
        @click='$emit( "update:show", false )'
        v-text='$t("cancel")'
      )
</template>

<script>
export default {
  name: 'NotificationRemove',
  props: {
    show: Boolean
  },
  i18n: {
    messages: {
      en: {
        message: 'Are you sure you want to delete this item?'
      },
      ru: {
        message: 'Вы уверенны в удалении уведомления?'
      }
    }
  }
};
</script>
