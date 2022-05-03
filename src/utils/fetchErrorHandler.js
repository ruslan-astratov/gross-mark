import { toast } from 'react-toastify'

export const fetchErrorHandler = (error) => {
    toast.error(`Возникли проблемы при отправке запроса: ${error}`, {
        position: toast.POSITION.TOP_LEFT,
    })
}
