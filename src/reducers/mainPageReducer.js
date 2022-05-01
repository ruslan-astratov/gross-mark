import { FETCH_VACANCIES } from '../constants/actionTypes.js'

const INIT_STATE = {
    vacancies: [],
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_VACANCIES: {
            return {
                ...state,
                vacancies: action.payload,
            }
        }

        default:
            return state
    }
}
