import http, { setBearer, getHeadersToken } from '@/http';
import { setTokens } from '@/cookies';

// Общий метод входа на сайт: SingIn, ConfrimRegistration, ConfirmPassword
const enterSite = ( { response, commit } ) => {
  setTokens( getHeadersToken( response.headers ) );
  commit( 'user/setUserInfo', response.data.user, { root: true } );
};

const headersToken = ( token ) => ( { 'Authorization': `Bearer ${ token }` } );

export default {
  namespaced: true,
  actions: {
    async signIn( { commit }, { email, password } ) {
      const response = await http.post( '/sign_in', { email, password }, { withoutToken: true } );
      enterSite( { response, commit } );
    },
    async signUp( _, { username, email, password } ) {
      await http.post( '/sign_up', { username, email, password }, { withoutToken: true } );
    },
    async checkUser( _, email ) {
      let check = false;
      try {
        const response = await http.post( '/check_user', { email }, { withoutToken: true } );
        check = response.data.check;
      } catch ( error ) { };
      return check;
    },
    async confirmRegistration( { commit }, { token } ) {
      const response = await http.post(
        '/confirm_registration',
        null,
        { headers: setBearer( token ), withoutToken: true }
      );
      enterSite( { response, commit } );
    },
    async repeatConfirmation( _, { email } ) {
      await http.post( '/repeat_confirmation', { email }, { withoutToken: true } );
    },
    async recoveryPassword( _, { email } ) {
      await http.post( '/recovery_password', { email }, { withoutToken: true } );
    },
    async confirmRecovery( _, { token } ) {
      await http.post( '/confirm_recovery', null, { headers: setBearer( token ), withoutToken: true } );
    },
    async changePassword( { commit }, { password, token } ) {
      const headers = headersToken( token );
      const response = await http.post( '/change_password', { password }, { headers, withoutToken: true } );
      enterSite( { response, commit } );
    }
  }
};
