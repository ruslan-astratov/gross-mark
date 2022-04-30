import axios from 'axios'
const http = axios.create({
    baseURL: `https://test.aic.thecoders.php.dev1.thecoders.ru/api`,
    headers: {},
})

http.init = () => {}

export default http
