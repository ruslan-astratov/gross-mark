import React, { useEffect } from 'react'
import HeaderLogo from '../HeaderLogo/HeaderLogo'
import fb_icon from './../../assets/icons/facebook_social_icon.svg'
import vk_icon from './../../assets/icons/vk_social_icon.svg'
//eslint-disable-next-line
import ModalWindow from '../ModalWindow/ModalWindow'
import ModalContent from '../ModalWindow/ModalContent'

import './style.css'

const Footer = () => {
    const [isModal, setModal] = React.useState(false)
    /* eslint-disable-next-line */
    const [textSecurityPolicy, setTextSecurityPolicy] = React.useState('')

    // При открытии модального окна выключаем возможность скролла у body
    // useEffect(()=> {
    //     if(isModal) {
    //         document.body.style.overflow = "hidden"
    //     } else  document.body.style.overflow = "auto"
    // } , [isModal])

    useEffect(() => {
        fetch('https://test.aic.thecoders.php.dev1.thecoders.ru/api/police')
            .then((response) => response.json())
            .then((data) => setTextSecurityPolicy(data.text))
            .catch((error) => {
                console.log('Произошла ошибка запроса', error)
            })
    }, [])

    const onClose = () => setModal(false)
    return (
        <footer className="footer">
            <div className="inner-container">
                <div className="social-block d-flex align-items-center">
                    <HeaderLogo />
                    <p className="link-to-share">поделиться</p>
                    <div className="social-networks-wrapper d-flex align-items-center">
                        <a
                            rel="noreferrer"
                            href="https://www.facebook.com/sharer.php?u=https://gross-mark.herokuapp.com"
                            target="_blank"
                            className="social-network-link"
                        >
                            <img alt="Facebook" src={fb_icon} />
                        </a>
                        <a
                            rel="noreferrer"
                            href="https://vk.com/share.php?url=https://gross-mark.herokuapp.com/"
                            target="_blank"
                            className="social-network-link"
                        >
                            <img alt="Facebook" src={vk_icon} />
                        </a>
                    </div>
                </div>

                <div className="copyright-block d-flex">
                    <p>&copy; Гросс маркет 2020</p>
                    {/* eslint-disable-next-line */}
                    <p
                        className="data-processing-policy"
                        onClick={() => setModal(true)}
                    >
                        Политика обработки персональных данных
                    </p>
                    <ModalWindow
                        visible={isModal}
                        title="Обработка данных"
                        content={
                            <ModalContent
                                textSecurityPolicy={textSecurityPolicy}
                            />
                        }
                        onClose={onClose}
                    />
                </div>
            </div>
        </footer>
    )
}

export default Footer
