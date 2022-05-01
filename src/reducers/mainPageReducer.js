import {
    FETCH_VACANCIES,
    FETCH_BANNERS,
    FETCH_MAPS_POINTS,
    FETCH_SECURITY_POLICY,
} from '../constants/actionTypes.js'

const INIT_STATE = {
    vacancies: [],
    banners: [],
    mapsPoints: [],
    securityPolicy: [],
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_VACANCIES: {
            return {
                ...state,
                vacancies: action.payload,
            }
        }

        case FETCH_BANNERS: {
            return {
                ...state,
                banners: action.payload,
            }
        }

        case FETCH_MAPS_POINTS: {
            return {
                ...state,
                mapsPoints: action.payload,
            }
        }
        case FETCH_SECURITY_POLICY: {
            return {
                ...state,
                securityPolicy: action.payload,
            }
        }

        default:
            return state
    }
}
