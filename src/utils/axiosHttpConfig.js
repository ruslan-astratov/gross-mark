import axios from 'axios'
const http = axios.create({
    //   baseURL: `${process.env.KU_API_URL}/v1/`,
    baseURL: `https://test.aic.thecoders.php.dev1.thecoders.ru/api`,
    headers: {},
})

http.init = () => {}
// http.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     const newConfig = config;
//     if (token) {
//       newConfig.headers.Authorization = `Bearer ${token}`;
//     }
//     return newConfig;
//   },
//   (err) => Promise.reject(err),
// );

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (err) => {
//     console.log('err', err);
//     return Promise.reject(err);
//   },
// );

export default http
