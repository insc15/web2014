import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import Cookies from 'js-cookie'

import { Cart, LastRoute, userLogin } from './reducers'

const rootReducer = combineReducers({
    cart: Cart,
    lastRoute: LastRoute,
    userLogin: userLogin
})
const initialState = {}
const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store