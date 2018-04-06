// const isProd = ( ) => process.env.NODE_ENV === 'production';
const isProd = ( ) => true;

export const urlApi = isProd( ) ? 'http://195.201.121.179:8080' : 'http://localhost:8090';
