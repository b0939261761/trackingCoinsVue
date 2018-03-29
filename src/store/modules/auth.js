import http from '@/http';
import { setTokens, removeTokens } from '@/cookies';

// Общий метод входа на сайт: SingIn, ConfrimRegistration, ConfirmPassword
const enterSite = ( response ) => {
  let status = response.data.status;
  if ( status ) {
    const { headers: { 'access-token': accessToken, 'refresh-token': refreshToken } } = response;
    setTokens( accessToken, refreshToken );
  } else {
    removeTokens( );
  };
  return response.data.status;
};

const headersToken = ( token ) => ( { 'Authorization': `Bearer ${ token }` } );

export default {
  namespaced: true,
  actions: {
    async signIn( _, { email, password } ) {
      return http.post( '/sing_in', { email, password } )
        .then( response => enterSite( response ) );
    },
    async signUp( _, { username, email, password } ) {
      return http.post( '/sing_up', { username, email, password } )
        .then( response => response.data.status );
    },
    async checkUser( _, email ) {
      return http.post( '/check_user', { email } )
        .then( response => response.data.status );
    },
    async confirmRegistration( _, { token } ) {
      const headers = headersToken( token );
      return http.post( '/confirm_registration', null, { headers } )
        .then( response => enterSite( response ) );
    },
    async repeatConfirmation( _, { email } ) {
      return http.post( '/repeat_confirmation', { email } )
        .then( response => response.data.status );
    },
    async recoveryPassword( _, { email } ) {
      return http.post( '/recovery_password', { email } )
        .then( response => response.data.status );
    },
    async confirmRecovery( _, { token } ) {
      const headers = headersToken( token );
      return http.post( '/confirm_recovery', null, { headers } )
        .then( response => response.data.status );
    },
    async changePassword( _, { password, token } ) {
      const headers = headersToken( token );
      return http.post( '/change_password', { password }, { headers } )
        .then( response => enterSite( response ) );
    }
    // async changePassword( { commit }, payload ) {
    //   const { accessToken, refreshoken } = getTokens( );
    //   const token = accessToken || refreshoken;
    //   if ( token ) {
    //     return http.post( '/change_password', payload )
    //       .then( response => enterSite( response ) );
    //   } else {
    //     return new Promise( resolve => resolve( true ) );
    //   }
    // }
  }
};
