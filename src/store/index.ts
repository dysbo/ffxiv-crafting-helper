import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import lodestone from './lodestone/reducer'

const rootReducer = combineReducers({ lodestone })

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)
