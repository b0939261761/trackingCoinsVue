import { parseJwt } from '@/jwt';
import Cookies from 'js-cookie';

const setToken = ( cookie, token ) => {
  const expires = new Date( parseJwt( token ).exp * 1000 );
  Cookies.set( cookie, token, { expires } );
};

export const getTokens = ( ) => {
  const accessToken = Cookies.get( 'accessToken' );
  const refreshToken = Cookies.get( 'refreshToken' );
  return { accessToken, refreshToken };
};

export const setTokens = ( accessToken, refreshToken ) => {
  setToken( 'accessToken', accessToken );
  setToken( 'refreshToken', accessToken );
};

export const removeTokens = ( ) => {
  Cookies.remove( 'accessToken' );
  Cookies.remove( 'refreshToken' );
};
