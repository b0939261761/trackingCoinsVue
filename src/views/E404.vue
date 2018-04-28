<template lang='pug'>
v-dialog(
  v-model='dialog'
  max-width='310px'
)
  v-card(
    class='blue darken-1 white--text'
  )
    v-card-title(
      class="headline"
      v-text='message'
    )

    v-card-text( v-text='customMessage' )

    v-card-actions
      v-spacer
      v-btn(
        @click='dialog = false'
        v-text='"OK"'
      )
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Error',
  computed: {
    ...mapState( {
      responseCode: state => state.error.code,
      responseMessage: state => state.error.message,
      customCode: state => state.error.customCode
    } ),
    code( ) {
      return this.responseCode || '';
    },
    message( ) {
      return `${ this.code } ${ this.$t( this.code ) || this.responseMessage || '' }`;
    },
    customMessage( ) {
      return this.$t( this.customCode ) || this.$t( 'other' );
    },
    dialog: {
      get( ) {
        return Number.isInteger( this.responseCode );
      },
      set( val ) {
        if ( !val ) {
          this.$store.commit( 'setError' );
        }
      }
    }
  },
  i18n: {
    messages: {
      en: {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Page Not Found.',
        503: 'Service Unavailable',
        FAIL_AUTH: 'Incorrect еmail or password',
        FAIL_EMAIL_EXISTS: 'Пользователь с данным email зарегистрирован.',
        FAIL_EMAIL_NOT_EXISTS: 'Пользователь с данным email отсуствует.',
        FAIL_SEND: 'Send email failed, please try again later.',
        FAIL_CONFIRM: 'Activation error, please try sending confirmation again.',
        FAIL_RECOVERY: 'Ошибка при востановлении пароля, попробуйте выслать подтверждение повторно.',
        FAIL_CHANGE_PASSWORD: 'The operation failed, please try again later.',
        other: 'Something wrong. Client default error message'
      },
      ru: {
        400: 'Плохой запрос',
        401: 'Аутентификация',
        403: 'Запрещено',
        404: 'Страница не найдена.',
        503: 'Service Unavailable',
        FAIL_AUTH: 'Неверный еmail или пароль.',
        FAIL_EMAIL_EXISTS: 'Пользователь с данным email зарегистрирован.',
        FAIL_EMAIL_NOT_EXISTS: 'Пользователь с данным email отсуствует.',
        FAIL_SEND: 'Отправка Email завершилась неудачно, попробуйте позже.',
        FAIL_CONFIRM: 'Ошибка при активации, попробуйте выслать подтверждение повторно.',
        FAIL_RECOVERY: 'Ошибка при востановлении пароля, попробуйте выслать подтверждение повторно.',
        FAIL_CHANGE_PASSWORD: 'Операция завершилась неудачно, попробуйте позже.',
        other: 'Something wrong. Client default error message'
      }
    }
  }
};
</script>
