import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import user from './modules/user';
import notifications from './modules/notifications';

import state from './state';
import getters from './getters';
import mutations from './mutations';

Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    auth,
    user,
    notifications
  },
  state,
  getters,
  mutations
} );
