import { LOAD_FORM } from '../constants/actionTypes.js'

const INIT_STATE = {
    isSubmitForm: false,
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_FORM: {
            return {
                ...state,
                isSubmitForm: action.payload,
            }
        }

        default:
            return state
    }
}
