import {
    FETCH_VACANCIES,
    FETCH_BANNERS,
    FETCH_MAPS_POINTS,
    FETCH_SECURITY_POLICY,
} from '../../constants/actionTypes'

export const fetchVacancies = (vacancies) => {
    return {
        type: FETCH_VACANCIES,
        payload: vacancies,
    }
}

export const fetchBanners = (banners) => {
    return {
        type: FETCH_BANNERS,
        payload: banners,
    }
}

export const fetchMapsPoints = (mapsPoints) => {
    return {
        type: FETCH_MAPS_POINTS,
        payload: mapsPoints,
    }
}

export const fetchSecurityPolicy = (securityPolicy) => {
    return {
        type: FETCH_SECURITY_POLICY,
        payload: securityPolicy,
    }
}
