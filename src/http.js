import axios from 'axios';
import store from '@/store/';
import { urlApi } from '@/variables';

const http = axios.create( {
  baseURL: urlApi
} );

const requestUse = config => {
  store.commit( 'showLoader' );
  return config;
};

const requestError = async error => {
  store.commit( 'hideLoader' );
  return Promise.reject( error );
};

const responseUse = async response => {
  // Для тестов таймаут
  await new Promise( resolve => setTimeout( resolve, 300 ) );
  store.commit( 'hideLoader' );
  return response;
};

const responseError = error => {
  store.commit( 'hideLoader' );
  return Promise.reject( error );
};

http.interceptors.request.use( requestUse, requestError );
http.interceptors.response.use( responseUse, responseError );

export default http;
