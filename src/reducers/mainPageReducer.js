import {
    SET_VACANCIES,
    SET_BANNERS,
    SET_MAPS_POINTS,
    SET_SECURITY_POLICY,
} from '../constants/actionTypes.js'

const INIT_STATE = {
    vacancies: [],
    banners: [],
    map_points: [],
    textSecurityPolicy: '',
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_VACANCIES: {
            return {
                ...state,
                vacancies: action.payload,
            }
        }

        case SET_BANNERS: {
            return {
                ...state,
                banners: action.payload,
            }
        }

        case SET_MAPS_POINTS: {
            return {
                ...state,
                map_points: action.payload,
            }
        }
        case SET_SECURITY_POLICY: {
            return {
                ...state,
                textSecurityPolicy: action.payload,
            }
        }

        default:
            return state
    }
}
