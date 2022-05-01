import {
    SET_VACANCIES,
    SET_BANNERS,
    SET_MAPS_POINTS,
    SET_SECURITY_POLICY,
} from '../constants/actionTypes'

export const setVacancies = (vacancies) => {
    return {
        type: SET_VACANCIES,
        payload: vacancies,
    }
}

export const setBanners = (banners) => {
    return {
        type: SET_BANNERS,
        payload: banners,
    }
}

export const setMapsPoints = (mapsPoints) => {
    return {
        type: SET_MAPS_POINTS,
        payload: mapsPoints,
    }
}

export const setSecurityPolicy = (securityPolicy) => {
    return {
        type: SET_SECURITY_POLICY,
        payload: securityPolicy,
    }
}
