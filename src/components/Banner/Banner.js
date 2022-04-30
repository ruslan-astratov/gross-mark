import 'react-responsive-carousel/lib/styles/carousel.min.css'
import PropTypes from 'prop-types'
import { baseUrlForFiles } from '../../constants/applicationConstants'
import { Carousel } from 'react-responsive-carousel'
import './style.css'

const Banner = ({ banners }) => {
    return (
        <div className="banner">
            <div className="inner-container banner-content-wrapper">
                <Carousel showThumbs={false} swipeable={false}>
                    {banners.length > 0 &&
                        banners.map((banner, index) => {
                            const bannerLetters = banner.text.split(',')
                            const sectionStyle = {
                                backgroundImage: `url('${baseUrlForFiles}${banner.image}')`,
                            }
                            return (
                                <div
                                    key={banner.id}
                                    className={`banner-slide ${
                                        index % 2 !== 0
                                            ? 'banner-slide__first-slide'
                                            : 'banner-slide__second-slide'
                                    }  d-flex`}
                                >
                                    <div className="banner-left-half">
                                        <h2>
                                            {index % 2 !== 0
                                                ? 'У тебя всё под контролем'
                                                : 'У тебя к этому талант'}
                                        </h2>
                                    </div>

                                    <div className="banner-right-half">
                                        <div
                                            style={sectionStyle}
                                            className="banner-right-half__ellipse"
                                        ></div>
                                        <p className="legend">
                                            {bannerLetters[0]}
                                        </p>
                                        <p className="legend">
                                            {bannerLetters[1]}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                </Carousel>

                <div className="banner-mobile">
                    <h2>У тебя к этому талант</h2>
                    <div className="banner-mobile-image">
                        <p className="legend">пекарь</p>
                        <p className="legend">валентин</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Banner.propTypes = {
    banners: PropTypes.array,
}
export default Banner
