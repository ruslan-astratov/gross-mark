import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'
import SimpleMap from '../../components/SimpleMap/SimpleMap'
import Carousel from '../../components/Carousel/Carousel'
import { ToastContainer } from 'react-toastify'

import {
    fetchVacancies,
    fetchBanners,
    fetchMapsPoints,
    fetchPolice,
} from '../../api/api'

import { fetchErrorHandler } from '../../utils/fetchErrorHandler'

import {
    setVacancies,
    setBanners,
    setMapsPoints,
    setSecurityPolicy,
} from '../../actions/mainPageActions'

import {
    startSectionShowButton,
    endSectionShowButton,
    minWidthScreenForShowButton,
    maxWidthScreenForShowButton,
} from '../../constants/applicationConstants'

import 'react-toastify/dist/ReactToastify.css'
import './style.css'

const MainPage = ({
    setVacanciesAction,
    setBannersAction,
    setMapsPointsAction,
    setSecurityPolicyAction,

    vacancies,
    banners,
    map_points,
    textSecurityPolicy,
}) => {
    const [isShowFixedButton, toggleShowFixedButton] = useState(false)

    const handleScroll = () => {
        if (
            window.pageYOffset > startSectionShowButton &&
            window.pageYOffset < endSectionShowButton &&
            window.innerWidth >= minWidthScreenForShowButton &&
            window.innerWidth < maxWidthScreenForShowButton
        ) {
            toggleShowFixedButton(true)
        } else toggleShowFixedButton(false)
    }

    useEffect(() => {
        window.addEventListener('touchmove', handleScroll)
        return () => window.removeEventListener('touchmove', handleScroll)
    })

    useEffect(() => {
        fetchVacancies()
            .then((vacancies) => {
                setVacanciesAction(vacancies.data)
            })
            .catch((error) => {
                fetchErrorHandler(error)
            })

        fetchBanners()
            .then((banners) => {
                setBannersAction(banners.data)
            })
            .catch((error) => {
                fetchErrorHandler(error)
            })

        fetchMapsPoints()
            .then((map_points) => {
                setMapsPointsAction(map_points.data)
            })
            .catch((error) => {
                fetchErrorHandler(error)
            })

        fetchPolice()
            .then((police) => {
                setSecurityPolicyAction(police.data.text)
            })
            .catch((error) => {
                fetchErrorHandler(error)
            })
    }, [])

    return (
        <div className="main-page">
            <div className="fixed-container">
                <Header onMainPage />

                {isShowFixedButton && (
                    <div className="fixed-button">
                        <Link className="link-to-form" to="/form-page">
                            заполнить анкету
                        </Link>
                    </div>
                )}

                {banners.length > 0 && <Banner banners={banners} />}
                {vacancies.length > 0 && <Carousel vacancies={vacancies} />}
            </div>

            {map_points.length > 0 && <SimpleMap map_points={map_points} />}
            <Footer textSecurityPolicy={textSecurityPolicy} />
            <ToastContainer />
        </div>
    )
}

MainPage.propTypes = {
    setVacanciesAction: PropTypes.func,
    setBannersAction: PropTypes.func,
    setMapsPointsAction: PropTypes.func,
    setSecurityPolicyAction: PropTypes.func,

    textSecurityPolicy: PropTypes.string,
    vacancies: PropTypes.array,
    banners: PropTypes.array,
    map_points: PropTypes.array,
}

const mapStateToProps = ({ mainPageReducer }) => {
    const { vacancies, banners, map_points, textSecurityPolicy } =
        mainPageReducer

    return {
        vacancies,
        banners,
        map_points,
        textSecurityPolicy,
    }
}

export default connect(mapStateToProps, {
    setVacanciesAction: setVacancies,
    setBannersAction: setBanners,
    setMapsPointsAction: setMapsPoints,
    setSecurityPolicyAction: setSecurityPolicy,
})(MainPage)
