import Vue from 'vue';
import store from '@/store/';

import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';

import i18nEn from '@/lang/en';
import i18nRu from '@/lang/ru';

Validator.extend( 'uncheck_email', async ( value ) => {
  const check = await store.dispatch( 'auth/checkUser', value );
  return { valid: check };
} );

Validator.extend( 'check_email', async ( value ) => {
  const check = await store.dispatch( 'auth/checkUser', value );
  return { valid: !check };
} );

const getAttributes = ( { email, password, passwordConfirm, username } ) =>
  ( { email, password, passwordConfirm, username } );

const dictionary = {
  en: {
    messages: {
      check_email: ( ) => 'A user with this email exists.',
      uncheck_email: ( ) => 'User with this email is not registered'
    },
    attributes: {
      ...getAttributes( i18nEn )
    }
  },
  ru: {
    messages: {
      check_email: ( ) => 'Пользователь с данным email существует.',
      uncheck_email: ( ) => 'Пользователь с данным email не зарегистрирован.'
    },
    attributes: {
      ...getAttributes( i18nRu )
    }
  }
};

Validator.localize( 'ru', ru );
Validator.localize( dictionary );

const Veeconfig = {
  locale: 'en'
  // events: 'blur'
};

Vue.use( VeeValidate, Veeconfig );

export default Validator;
