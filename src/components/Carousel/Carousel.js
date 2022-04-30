import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import PropTypes from 'prop-types'
import { baseUrlForFiles } from '../../constants/applicationConstants'

import './style.css'

const handleDragStart = (e) => e.preventDefault()

const responsive = {
    0: { items: 1.2 },
    568: { items: 2.2 },
    1024: { items: 3.2 },
}

const Carousel = ({ vacancies }) => {
    const items = vacancies.map((vacancie) => {
        return (
            <div className="carousel-slide" key={vacancie.id}>
                <div className="carousel-slide-overlay">
                    <p>{vacancie.text}</p>
                </div>
                <img
                    src={`${baseUrlForFiles}${vacancie.image}`}
                    onDragStart={handleDragStart}
                    alt="commodity_expert"
                />
                <p>{vacancie.header}</p>
            </div>
        )
    })

    return (
        <div className="alice-carousel-wr">
            <h2>вакансии в гросс маркете</h2>
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
            />
        </div>
    )
}

Carousel.propTypes = {
    vacancies: PropTypes.array,
}

export default Carousel
