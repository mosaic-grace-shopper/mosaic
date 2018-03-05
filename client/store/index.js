import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './users'
import products from './products'
import orders from './orders'
import orderLine from './orderLine'
import cart from './cart'
import shipmentDetails from './shipmentDetails'
import categories from './categories'

const reducer = combineReducers({user, users, products, cart, orders, orderLine, categories, shipmentDetails})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './products'
export * from './cart'
export * from './orders'
export * from './orderLine'
export * from './shipmentDetails'
export * from './categories'

