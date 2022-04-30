import http from '../utils/axiosHttpConfig'

export const fetchVacancies = () => http.get('/vacancies')
export const fetchBanners = () => http.get('/banners')
export const fetchMapsPoints = () => http.get('/map-points')
export const fetchPolice = () => http.get('/police')

const config = {
    headers: {
        Authorization: 'Basic ' + window.btoa('coders:coders'),
    },
}
export const submitBlank = (payload) =>
    http.post('/employee-form', payload, config)
