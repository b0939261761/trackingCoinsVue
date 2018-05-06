import axios from 'axios';
import store from '@/store/';
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from '@/cookies';
import router from '@/router';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://realitycoins.cf:8090' : 'http://192.168.5.141:8090';

const http = axios.create( {
  baseURL
} );

export const setBearer = ( token ) => ( { 'Authorization': `Bearer ${ token }` } );
export const getHeadersToken = ( { 'access-token': accessToken, 'refresh-token': refreshToken } ) =>
  ( { accessToken, refreshToken } );

const hideLoader = timerPreloader => {
  if ( timerPreloader ) clearTimeout( timerPreloader ); // Очищаем таймер
  store.commit( 'hideLoader' );
};

class TokenNotExistsError extends Error {
  constructor( timerPreloader ) {
    const message = 'Token not exists';
    super( message );
    this.message = message;
    this.code = 1000;
    this.timerPreloader = timerPreloader;
    Error.captureStackTrace( this, this.constructor );
  }
};

const getTokensAndRetry = async ( config ) => {
  const timerPreloader = config._timerPreloader;

  const currentRefreshToken = getRefreshToken( );
  if ( currentRefreshToken ) {
    const { headers: repsonseHeaders } = await axios.post(
      `${ baseURL }/take_access_token`,
      null,
      { headers: setBearer( currentRefreshToken ) }
    );

    const { accessToken, refreshToken } = getHeadersToken( repsonseHeaders );

    setTokens( { accessToken, refreshToken } );
    return accessToken;
  }

  throw new TokenNotExistsError( timerPreloader );
};

const parseError = error => {
  let [ code, message, customCode, timerPreloader ] = [ 0, error.message, null, null ];

  if ( error.code && error.code === 1000 ) {
    code = error.code;
    message = error.message;
    timerPreloader = error.timerPreloader;
  } else {
    const errorConfig = error.config;
    const errorResponse = error.response;
    timerPreloader = errorConfig._timerPreloader;

    if ( errorResponse ) {
      code = errorResponse.status;
      message = errorResponse.statusText;
      customCode = errorResponse.data.error;
    };
  };

  return { code, message, customCode, timerPreloader };
};

const requestUse = async ( config ) => {
  if ( !config._timerPreloader ) {
    // Run preloader if query above long time
    config._timerPreloader = setTimeout( ( ) => store.commit( 'showLoader' ), 1000 );
  };

  if ( !config.withoutToken ) {
    let accessToken = getAccessToken( );
    if ( accessToken ) {
      config.headers[ 'Authorization' ] = `Bearer ${ accessToken }`;
    } else {
      accessToken = await getTokensAndRetry( config );
      config.headers[ 'Authorization' ] = `Bearer ${ accessToken }`;
    }
  }
  return config;
};

const requestError = async error => {
  hideLoader( error.response.config._timerPreloader );
  return Promise.reject( error );
};

const responseUse = async response => {
  await new Promise( resolve => setTimeout( resolve, 500 ) ); // Для тестов таймаут
  hideLoader( response.config._timerPreloader );
  return response;
};

const responseError = async error => {
  let { code, message, customCode, timerPreloader } = parseError( error );

  if ( code === 401 ) {
    const errorConfig = error.config;

    if ( !errorConfig._retry ) {
      errorConfig._retry = true;

      let accessToken;
      try {
        accessToken = await getTokensAndRetry( errorConfig );
      } catch ( error ) {
        ( { code, message, customCode } = parseError( error ) );
      };

      if ( accessToken ) {
        return http( errorConfig );
      }
    }
    removeTokens( );
    router.push( { name: 'signIn' } );
  };

  store.commit( 'setError', { code, message, customCode } );
  hideLoader( timerPreloader );

  return Promise.reject( error );
};

http.interceptors.request.use( requestUse, requestError );
http.interceptors.response.use( responseUse, responseError );

export default http;
