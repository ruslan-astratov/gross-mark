import { FETCH_VACANCIES } from '../../constants/actionTypes'

export const fetchVacancies = (vacancies) => {
    return {
        type: FETCH_VACANCIES,
        payload: vacancies,
    }
}
