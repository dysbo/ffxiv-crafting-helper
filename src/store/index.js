import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const rootReducer = combineReducers({
  local: reducer
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)
