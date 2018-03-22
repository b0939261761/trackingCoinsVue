const isProd = ( ) => process.env.NODE_ENV === 'production';

export const urlApi = isProd ? 'http://localhost:8090' : 'http://77.93.44.6:8090';
