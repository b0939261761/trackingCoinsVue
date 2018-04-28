import http from '@/http';

export default {
  namespaced: true,
  state: {
    username: null,
    email: null,
    lang: null
  },
  mutations: {
    setUserInfo( state, { username, email, lang } = { } ) {
      state.username = username;
      state.email = email;
      state.lang = lang;
    }
  },
  actions: {
    async userUpdate( { commit }, data ) {
      return http.post( '/user_update', data )
        .then( ( { data: { status, user } } ) => {
          if ( status ) {
            commit( 'setUserInfo', user );
            return status;
          }
        } );
    },
    async userInfo( { state, commit } ) {
      if ( state.email ) {
        return Promise.resolve( true );
      } else {
        return http.post( '/user_info' )
          .then( ( { data: { status, user } } ) => {
            if ( status ) {
              commit( 'setUserInfo', user );
              return status;
            }
          } );
      }
    }

  }
};
