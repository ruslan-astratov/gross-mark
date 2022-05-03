import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import close_icon from './../../assets/icons/close_icon.svg'
import cn from 'classnames'

import './style.css'

const ModalWindow = ({
    visible = false,
    title = '',
    content = {},
    footer = '',
    onClose,
}) => {
    const [scroll, setScroll] = React.useState(0)

    const handleScroll = (event) => {
        setScroll(event.target.scrollTop)
    }

    useEffect(() => {
        document
            ?.querySelector('.modal-body')
            ?.addEventListener('scroll', handleScroll)
        return () =>
            document
                ?.querySelector('.modal-body')
                ?.removeEventListener('scroll', handleScroll)
    })

    // создаем обработчик нажатия клавиши Esc
    const onKeydown = (event) => {
        if (event.key === 'Escape') {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    // если компонент невидим, то не отображаем его
    if (!visible) return null

    // или возвращаем верстку модального окна
    return (
        <div className="modal" onClick={onClose} aria-hidden="true">
            <div
                className="modal-dialog"
                onClick={(e) => e.stopPropagation()}
                aria-hidden="true"
            >
                <div className="modal-header">
                    <h3
                        className={cn(
                            'modal-title',
                            scroll >= 100 && 'modal-title_mini'
                        )}
                    >
                        {title}
                    </h3>
                    <span
                        className="modal-close"
                        onClick={onClose}
                        aria-hidden="true"
                    >
                        <img alt="Facebook" src={close_icon} />
                    </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">{content}</div>
                </div>
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    )
}

ModalWindow.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.object,
    footer: PropTypes.string,
    onClose: PropTypes.func,
}
export default ModalWindow
