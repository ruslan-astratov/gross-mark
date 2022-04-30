import http from '../utils/axiosHttpConfig'

export const fetchVacancies = () =>
    http.get("/vacancies")

// export const fetchAnalytics = (payload) =>
//   http.post(process.env.KU_ANALYTICS_STATISTIC_GROUP, payload);
// export const fetchPostRating = (payload) =>
//   http.post(process.env.KU_ANALYTICS_STATISTIC_POST, payload);
// export const fetchPostOverview = (payload) =>
//   http.post(process.env.KU_ANALYTICS_STATISTIC_OVERVIEW, payload);
