import http from '@/http';

export default {
  namespaced: true,
  state: {
    username: null,
    email: null,
    emailActivated: null,
    emailEnabled: null,
    lang: null,
    telegramUsername: null,
    telegramFullName: null,
    telegramActivated: null,
    telegramEnabled: null
  },
  mutations: {
    setUserInfo( state, user = { } ) {
      state.username = user.username;
      state.email = user.email;
      state.lang = user.lang;
      state.emailEnabled = user.email_enabled;
      state.emailActivated = user.email_activated;
      state.telegramUsername = user.telegram_username;
      state.telegramFullName = user.telegram_full_name;
      state.telegramActivated = user.telegram_activated;
      state.telegramEnabled = user.telegram_enabled;
    }
  },
  actions: {
    async userUpdate( { commit }, data ) {
      const response = await http.post( '/user_update', data );
      commit( 'setUserInfo', response.data.user );
    },
    async userInfo( { state, commit } ) {
      if ( !state.email ) {
        const response = await http.post( '/user_info' );
        commit( 'setUserInfo', response.data.user );
      }
    },
    async userRemove( ) {
      await http.post( '/user_remove' );
    }
  }
};
