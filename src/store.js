import {applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './Reducers/index' 
const redux = require('redux')

const initialState = {}
const middleware = [thunk]

const store = redux.createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store