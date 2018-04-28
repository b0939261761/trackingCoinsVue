import { parseJwt } from '@/jwt';
import Cookies from 'js-cookie';

const setToken = ( cookie, token ) => {
  if ( token ) {
    const expires = new Date( parseJwt( token ).exp * 1000 );
    Cookies.set( cookie, token, { expires } );
  } else {
    Cookies.remove( cookie );
  }
};

export const getAccessToken = ( ) => Cookies.get( 'accessToken' );
export const getRefreshToken = ( ) => Cookies.get( 'refreshToken' );
export const getTokens = ( ) => ( { accessToken: getAccessToken, refreshToken: getRefreshToken } );

export const setAccessToken = token => setToken( 'accessToken', token );
export const setRefreshToken = token => setToken( 'refreshToken', token );
export const setTokens = ( { accessToken, refreshToken } ) => {
  setAccessToken( accessToken );
  setRefreshToken( refreshToken );
};

export const removeAccessToken = ( ) => Cookies.remove( 'accessToken' );
export const removeRefreshToken = ( ) => Cookies.remove( 'refreshToken' );
export const removeTokens = ( ) => {
  removeAccessToken( );
  removeRefreshToken( );
};
