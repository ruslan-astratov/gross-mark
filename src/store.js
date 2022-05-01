import { configureStore } from '@reduxjs/toolkit'
import formReducer from './reducers/formReducer'
import mainPageReducer from './reducers/mainPageReducer'

import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default configureStore(
    {
        reducer: {
            formReducer: formReducer,
            mainPageReducer: mainPageReducer,
        },
    },
    applyMiddleware(thunk)
)
