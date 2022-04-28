import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'
import SimpleMap from '../../components/SimpleMap/SimpleMap'
import Carousel from '../../components/Carousel/Carousel'

import './style.css'

const MainPage = () => {
    const [isShowFixedButton, toggleShowFixedButton] = useState(false)
    //eslint-disable-next-line
    const [vacancies, setVacancies] = useState([])
    //eslint-disable-next-line
    const [banners, setBanners] = useState([])
    //eslint-disable-next-line
    const [map_points, setMapPoints] = useState(null)

    const handleScroll = () => {
        if (
            window.pageYOffset > 70 &&
            window.pageYOffset < 1050 &&
            window.innerWidth >= 375 &&
            window.innerWidth < 768
        ) {
            toggleShowFixedButton(true)
        } else toggleShowFixedButton(false)
    }

    useEffect(() => {
        // Событие скролла на мобильном устройстве (position: sticky не подойдёт!)
        window.addEventListener('touchmove', handleScroll)
        return () => window.removeEventListener('touchmove', handleScroll)
    })

    useEffect(() => {
        fetch('https://test.aic.thecoders.php.dev1.thecoders.ru/api/vacancies')
            .then((response) => response.json())
            .then((vacancies) => {
                setVacancies(vacancies)
                console.log(vacancies)
            })
            .catch((error) => {
                console.log('Произошла ошибка запроса', error)
            })

        fetch('https://test.aic.thecoders.php.dev1.thecoders.ru/api/banners')
            .then((response) => response.json())
            .then((banners) => {
                setBanners(banners)
                console.log(banners)
            })
            .catch((error) => {
                console.log('Произошла ошибка запроса', error)
            })

        fetch('https://test.aic.thecoders.php.dev1.thecoders.ru/api/map-points')
            .then((response) => response.json())
            .then((map_points) => {
                setMapPoints(map_points)
                console.log(map_points)
            })
            .catch((error) => {
                console.log('Произошла ошибка запроса', error)
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
        </div>
    )
}

export default MainPage
