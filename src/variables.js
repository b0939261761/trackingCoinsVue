const isProd = process.env.NODE_ENV === 'production';

// export const urlApi = isProd ? 'http://195.201.121.179:8090' : 'http://192.168.5.100:8090';
export const urlApi = isProd ? 'http://195.201.121.179:8090' : 'http://localhost:8090';
// export const urlApi = 'http://195.201.121.179:8090';
