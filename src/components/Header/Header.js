import HeaderLogo from '../HeaderLogo/HeaderLogo'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import close_icon from './../../assets/icons/close_icon.svg'
import phone_icon from './../../assets/icons/phone_icon_in_mobile_header.jpg'
import cn from 'classnames'

import './style.css'

const Header = ({ onMainPage = false }) => {
    return (
        <header className={cn('header', onMainPage && 'header_mainpage')}>
            <div className="inner-container">
                <div className="header-logo-wrapper d-flex space-between">
                    <HeaderLogo />

                    {onMainPage && (
                        <a href="tel:+7(926)433-14-16">
                            <img
                                className="phone_icon"
                                alt="Позвонить"
                                src={phone_icon}
                            />
                        </a>
                    )}

                    {onMainPage && (
                        <div className="header-phone-and-link-wrapper d-flex align-items-center">
                            <p>+7 (926) 433-14-16</p>
                            <Link className="link-to-form" to="/form-page">
                                заполнить анкету
                            </Link>
                        </div>
                    )}

                    {!onMainPage && (
                        <Link className="link-to-main" to="/">
                            <img
                                className="close-button"
                                alt="Закрыть"
                                src={close_icon}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    onMainPage: PropTypes.bool,
}
export default Header
