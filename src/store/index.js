import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';

import state from './state';
import mutations from './mutations';

Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    auth
  },
  state,
  mutations
} );
