import {
    FETCH_VACANCIES,
    FETCH_BANNERS,
    FETCH_MAPS_POINTS,
    FETCH_SECURITY_POLICY,
} from '../constants/actionTypes'

export const setVacancies = (vacancies) => {
    return {
        type: FETCH_VACANCIES,
        payload: vacancies,
    }
}

export const setBanners = (banners) => {
    return {
        type: FETCH_BANNERS,
        payload: banners,
    }
}

export const setMapsPoints = (mapsPoints) => {
    return {
        type: FETCH_MAPS_POINTS,
        payload: mapsPoints,
    }
}

export const setSecurityPolicy = (securityPolicy) => {
    return {
        type: FETCH_SECURITY_POLICY,
        payload: securityPolicy,
    }
}
