import http from '@/http';
import { parseJwt } from '@/jwt';
import Cookies from 'js-cookie';

const setToken = ( cookie, token ) => {
  const expires = new Date( parseJwt( token ).exp * 1000 );
  Cookies.set( cookie, token, { expires } );
  console.log( document.cookie );
};

const setTokens = ( accessToken, refreshToken ) => {
  setToken( 'accessToken', accessToken );
  setToken( 'refreshToken', accessToken );
};

const removeTokens = ( ) => {
  Cookies.remove( 'accessToken' );
  Cookies.remove( 'refreshToken' );
};

// Общий метод входа на сайт: SingIn, ConfrimRegistration, ConfirmPassword
const enterSite = ( response ) => {
  if ( response.data.status ) {
    setTokens( response.data.access_token, response.data.refresh_token );
  } else {
    removeTokens( );
  };
  return response.data.status;
};

export default {
  namespaced: true,
  actions: {
    async signIn( { commit }, { email, password } ) {
      return http.post( '/sing_in', { email, password } )
        .then( response => enterSite( response ) );
    },
    async signUp( { commit }, { username, email, password } ) {
      return http.post( '/sing_up', { username, email, password } )
        .then( response => response.data.status );
    },
    async checkUser( { commit }, email ) {
      return http.post( '/check_user', { email } )
        .then( response => response.data.status );
    },
    async confirmRegistration( { commit }, token ) {
      return http.post( '/confirm_registration', { token } )
        .then( response => enterSite( response ) );
    },
    async repeatConfirmation( _, email ) {
      return http.post( '/repeat_confirmation', { email } )
        .then( response => enterSite( response ) );
    },
    async recoveryPassword( _, email ) {
      return http.post( '/recovery_password', { email } )
        .then( response => response.data.status );
    },
    async confirmRecovery( { commit }, token ) {
      return http.post( '/confirm_recovery', { token } )
        .then( response => response.data.status );
    }
  }
};
