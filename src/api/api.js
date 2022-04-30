import http from '../utils/axiosHttpConfig'

export const fetchVacancies = () => http.get('/vacancies')

const config = {
    headers: {
        Authorization: 'Basic ' + window.btoa('coders:coders'),
    },
}
export const submitBlank = (payload) =>
    http.post('/employee-form', payload, config)
