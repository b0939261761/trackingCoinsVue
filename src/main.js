import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/';

import Vuetify from 'vuetify';

import VeeValidate from 'vee-validate';
import '@/validator';

Vue.use( VeeValidate );
Vue.use( Vuetify );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  render: h => h( App )
} ).$mount( '#app' );
