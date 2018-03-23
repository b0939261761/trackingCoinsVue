const isProd = ( ) => process.env.NODE_ENV === 'production';

export const urlApi = isProd( ) ? 'http://77.93.44.6:8086' : 'http://localhost:8090';
