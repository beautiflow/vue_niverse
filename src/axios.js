import axios from "axios";

export const getGeosAxios = axios.create({
    // baseURL: 'http://localhost:3000/',
    server: {
    proxy: {
      '/geoserver': {
        target: 'http://localhost:8081', // GeoServer 백엔드 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geoserver/, '/geoserver'),
      },
    },
  },
})


export const getJsonAxios = axios.create({
  baseURL: 'http://localhost:3000/',
})
