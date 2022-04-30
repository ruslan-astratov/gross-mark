import axios from 'axios'
import { baseUrl } from '../constants/applicationConstants'
const http = axios.create({
    baseURL: baseUrl,
    headers: {},
})

http.init = () => {}

export default http
