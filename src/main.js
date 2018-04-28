import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/';

import Vuetify from 'vuetify';

import '@/validator';

import i18n from '@/lang/index';

import ChooseLang from '@/components/ChooseLang';

Vue.use( Vuetify );

Vue.config.productionTip = false;

Vue.component( 'ChooseLang', ChooseLang );

Vue.directive( 'focus', {
  inserted( el ) {
    el.querySelector( '[data-focus]' ).focus( );
  }
} );

new Vue( {
  router,
  store,
  i18n,
  render: h => h( App )
} ).$mount( '#app' );
