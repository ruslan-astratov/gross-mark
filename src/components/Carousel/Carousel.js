import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import PropTypes from 'prop-types'

// import driver from './../../assets/images/водитель.png'
// import cashier from './../../assets/images/кассир.png'
// import baker from './../../assets/images/пекарь.png'
// import cook from './../../assets/images/повар.png'
// import receiver from './../../assets/images/приёмщик.png'
// import seller from './../../assets/images/продавец.png'
// import commodity_expert from './../../assets/images/товаровед.png'

import './style.css'

const handleDragStart = (e) => e.preventDefault()

// const responsive = {
//   0: { items: 1 },
//   568: { items: 2 },
//   1024: { items: 3.2 },
// };
const responsive = {
    0: { items: 1.2 },
    568: { items: 2.2 },
    1024: { items: 3.2 },
}

// const items = [
//     <div className="carousel-slide" key={0}>
//         <div className="carousel-slide-overlay">
//             <p>
//                 Доставка товара по магазинам и гипермаркетам компании в
//                 обслуживаемом регионе
//             </p>
//         </div>
//         <img
//             src={commodity_expert}
//             onDragStart={handleDragStart}
//             alt="commodity_expert"
//         />
//         <p>товаровед</p>
//     </div>,

//     <div className="carousel-slide" key={1}>
//         <div className="carousel-slide-overlay">
//             <p>
//                 Доставка товара по магазинам и гипермаркетам компании в
//                 обслуживаемом регионе
//             </p>
//         </div>
//         <img src={driver} onDragStart={handleDragStart} alt="driver" />
//         <p>водитель</p>
//     </div>,

//     <div className="carousel-slide" key={2}>
//         <div className="carousel-slide-overlay">
//             <p>
//                 Доставка товара по магазинам и гипермаркетам компании в
//                 обслуживаемом регионе
//             </p>
//         </div>
//         <img src={baker} onDragStart={handleDragStart} alt="baker" />
//         <p>пекарь</p>
//     </div>,

//     <div className="carousel-slide" key={3}>
//         <div className="carousel-slide-overlay">
//             <p>
//                 Доставка товара по магазинам и гипермаркетам компании в
//                 обслуживаемом регионе
//             </p>
//         </div>
//         <img src={cashier} onDragStart={handleDragStart} alt="cashier" />
//         <p>кассир</p>
//     </div>,

//     <div className="carousel-slide" key={4}>
//         <div className="carousel-slide-overlay">
//             <p>
//                 Доставка товара по магазинам и гипермаркетам компании в
//                 обслуживаемом регионе
//             </p>
//         </div>
//         <img src={cook} onDragStart={handleDragStart} alt="cook" />
//         <p>повар</p>
//     </div>,

//     <div className="carousel-slide" key={5}>
//         <div className="carousel-slide-overlay">
//             <p>
//                 Доставка товара по магазинам и гипермаркетам компании в
//                 обслуживаемом регионе
//             </p>
//         </div>
//         <img src={receiver} onDragStart={handleDragStart} alt="receiver" />
//         <p>приёмщик</p>
//     </div>,

//     <div className="carousel-slide" key={6}>
//         <div className="carousel-slide-overlay">
//             <p>
//                 Доставка товара по магазинам и гипермаркетам компании в
//                 обслуживаемом регионе
//             </p>
//         </div>
//         <img src={seller} onDragStart={handleDragStart} alt="seller" />
//         <p>продавец</p>
//     </div>,
// ]

//eslint-disable-next-line
const Carousel = ({ vacancies }) => {
    const items = vacancies.map((vacancie) => {
        return (
            <div className="carousel-slide" key={vacancie.id}>
                <div className="carousel-slide-overlay">
                    <p>{vacancie.text}</p>
                </div>
                <img
                    src={`https://test.aic.thecoders.php.dev1.thecoders.ru${vacancie.image}`}
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
                // paddingRight={100}
            />
        </div>
    )
}

Carousel.propTypes = {
    vacancies: PropTypes.array,
}

export default Carousel
