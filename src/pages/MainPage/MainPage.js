import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'
import SimpleMap from '../../components/SimpleMap/SimpleMap'
import Carousel from '../../components/Carousel/Carousel'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    fetchVacancies,
    fetchBanners,
    fetchMapsPoints,
    fetchPolice,
} from '../../api/api'

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

import './style.css'

const MainPage = ({
    setVacanciesAction,
    setBannersAction,
    setMapsPointsAction,
    setSecurityPolicyAction,
}) => {
    const [isShowFixedButton, toggleShowFixedButton] = useState(false)
    const [vacancies, setVacancies] = useState([])
    const [banners, setBanners] = useState([])
    const [map_points, setMapPoints] = useState(null)

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
                setVacancies(vacancies.data)
                setVacanciesAction(vacancies.data)
            })
            .catch((error) => {
                toast.error(
                    `Возникли проблемы при отправке запроса: ${error}`,
                    {
                        position: toast.POSITION.TOP_LEFT,
                    }
                )
            })

        fetchBanners()
            .then((banners) => {
                setBanners(banners.data)
                setBannersAction(banners.data)
            })
            .catch((error) => {
                toast.error(
                    `Возникли проблемы при отправке запроса: ${error}`,
                    {
                        position: toast.POSITION.TOP_LEFT,
                    }
                )
            })

        fetchMapsPoints()
            .then((map_points) => {
                setMapPoints(map_points.data)
                setMapsPointsAction(map_points.data)
            })
            .catch((error) => {
                toast.error(
                    `Возникли проблемы при отправке запроса: ${error}`,
                    {
                        position: toast.POSITION.TOP_LEFT,
                    }
                )
            })

        fetchPolice()
            .then((police) => {
                setSecurityPolicyAction(police.data.text)
            })
            .catch((error) => {
                toast.error(
                    `Возникли проблемы при отправке запроса: ${error}`,
                    {
                        position: toast.POSITION.TOP_LEFT,
                    }
                )
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

                <Banner banners={banners} />
                {vacancies.length > 0 && <Carousel vacancies={vacancies} />}
            </div>

            {map_points && <SimpleMap map_points={map_points} />}
            <Footer />
            <ToastContainer />
        </div>
    )
}

MainPage.propTypes = {
    setVacanciesAction: PropTypes.func,
    setBannersAction: PropTypes.func,
    setMapsPointsAction: PropTypes.func,
    setSecurityPolicyAction: PropTypes.func,
}

export default connect(() => {}, {
    setVacanciesAction: setVacancies,
    setBannersAction: setBanners,
    setMapsPointsAction: setMapsPoints,
    setSecurityPolicyAction: setSecurityPolicy,
})(MainPage)
