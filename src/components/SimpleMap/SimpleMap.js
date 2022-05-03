import { useState } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import PropTypes from 'prop-types'

import map_placemark from './../../assets/icons/map_placemark.svg'
import map_icon_asc from './../../assets/icons/map_icon_asc.svg'
import map_icon_desc from './../../assets/icons/map_icon_desc.svg'
import cn from 'classnames'

import './style.css'

const SimpleMap = ({ map_points }) => {
    const coordinates = map_points.map((p) => {
        return [Number(p.lat), Number(p.lon)]
    })

    const individuals = map_points
        .filter((p) => p.type === 'natural')
        .map((p) => {
            return [Number(p.lat), Number(p.lon)]
        })

    const legalEntities = map_points
        .filter((p) => p.type === 'legal')
        .map((p) => {
            return [Number(p.lat), Number(p.lon)]
        })

    const [activeButton, setActiveButton] = useState('показать всё')
    const [filteredCoordinates, setFilteredCoordinates] = useState(coordinates)
    const [mapState, setMapState] = useState({
        center: [55.752802, 37.621183],
        zoom: 12,
        behaviors: ['default', 'scrollZoom'],
    })

    const filterCoord = (val) => {
        setActiveButton(val)

        if (val === 'показать всё') {
            setFilteredCoordinates(coordinates)
            return
        }

        if (val === 'физлица') {
            setFilteredCoordinates(individuals)
        }

        if (val === 'юрлица') {
            setFilteredCoordinates(legalEntities)
        }
    }

    const changeScale = (val) => {
        const newMapState = { ...mapState }

        if (val === '-') {
            newMapState.zoom = newMapState.zoom - 1
        }
        if (val === '+') {
            newMapState.zoom = newMapState.zoom + 1
        }
        setMapState(newMapState)
    }

    return (
        <div className="inner-container map-wrapper">
            <h2>география</h2>
            <YMaps>
                <Map width="100%" height="540px" state={mapState}>
                    {filteredCoordinates.map((coordinate, index) => (
                        <Placemark
                            key={index}
                            geometry={coordinate}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: map_placemark,
                                iconImageSize: [30, 42],
                                iconImageOffset: [-3, -42],
                            }}
                        />
                    ))}
                </Map>
            </YMaps>

            <div className="map-filters-buttons">
                <button
                    className={cn(
                        activeButton === 'юрлица' && 'active-map-button'
                    )}
                    onClick={() => filterCoord('юрлица')}
                >
                    юрлица
                </button>
                <button
                    className={cn(
                        activeButton === 'физлица' && 'active-map-button'
                    )}
                    onClick={() => filterCoord('физлица')}
                >
                    физлица
                </button>
                <button
                    className={cn(
                        activeButton === 'показать всё' && 'active-map-button'
                    )}
                    onClick={() => filterCoord('показать всё')}
                >
                    показать всё
                </button>
            </div>

            <div className="map-scale-buttons">
                <button onClick={() => changeScale('+')}>
                    <img
                        className="close-button"
                        alt="Увеличить карту"
                        src={map_icon_asc}
                    />
                </button>
                <button onClick={() => changeScale('-')}>
                    <img
                        className="close-button"
                        alt="Уменьшить карту"
                        src={map_icon_desc}
                    />
                </button>
            </div>
        </div>
    )
}

SimpleMap.propTypes = {
    map_points: PropTypes.array,
}

export default SimpleMap
