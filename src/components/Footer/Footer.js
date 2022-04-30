import React, { useEffect } from 'react'
import HeaderLogo from '../HeaderLogo/HeaderLogo'
import fb_icon from './../../assets/icons/facebook_social_icon.svg'
import vk_icon from './../../assets/icons/vk_social_icon.svg'
import ModalWindow from '../ModalWindow/ModalWindow'
import ModalContent from '../ModalWindow/ModalContent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { fetchPolice } from '../../api/api'

import './style.css'

const Footer = () => {
    const [isModal, setModal] = React.useState(false)
    const [textSecurityPolicy, setTextSecurityPolicy] = React.useState('')

    useEffect(() => {
        fetchPolice()
            .then((police) => {
                setTextSecurityPolicy(police.data.text)
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
                            href="https://www.facebook.com/sharer.php?u=https://ruslan-astratov.github.io/gross-mark"
                            target="_blank"
                            className="social-network-link"
                        >
                            <img alt="Facebook" src={fb_icon} />
                        </a>
                        <a
                            rel="noreferrer"
                            href="https://vk.com/share.php?url=https://ruslan-astratov.github.io/gross-mark"
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
            <ToastContainer />
        </footer>
    )
}

export default Footer
