import PropTypes from 'prop-types'

const ModalContent = ({ textSecurityPolicy }) => {
    return (
        <div className="modal-content-wrapper">
            {textSecurityPolicy.length > 0 &&
                textSecurityPolicy.split('***').map((descBlock, index) => {
                    return (
                        <div key={index} className="modal-content__desc-block">
                            <div
                                className="content"
                                dangerouslySetInnerHTML={{ __html: descBlock }}
                            ></div>
                        </div>
                    )
                })}
        </div>
    )
}

ModalContent.propTypes = {
    textSecurityPolicy: PropTypes.string,
}

export default ModalContent
