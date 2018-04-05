import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import store from '@/store/';
import http from '@/http';
import Validator from '@/validator';

Vue.use( VueI18n );

const loadedLanguages = [ ];

const i18n = new VueI18n( {
  silentTranslationWarn: true
} );
export default i18n;

const setI18nLanguage = lang => {
  i18n.locale = lang;

  Validator.localize( lang );
  http.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector( 'html' ).lang = lang;
  store.commit( 'setCurrentLang', { lang } );
  Cookies.set( 'lang', lang, { expires: 20 * 365 } );

  return lang;
};

export const loadLanguageAsync = lang => {
  if ( i18n.locale !== lang ) {
    if ( !loadedLanguages.includes( lang ) ) {
      return import( `@/lang/${ lang }` ).then( response => {
        i18n.setLocaleMessage( lang, response.default );
        loadedLanguages.push( lang );
        return setI18nLanguage( lang );
      } );
    }
    return Promise.resolve( setI18nLanguage( lang ) );
  }
  return Promise.resolve( lang );
};

const cookieLang = Cookies.get( 'lang' );

const lang = (
  ( /^(en|ru)$/.test( cookieLang ) && cookieLang ) ||
  ( navigator.languages && navigator.languages[ 0 ] ) ||
  navigator.language ||
  navigator.userLanguage ||
  'en' ).slice( 0, 2 );

loadLanguageAsync( lang );
