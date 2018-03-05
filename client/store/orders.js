import axios from 'axios';
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const GET_ORDER_BY_ID = 'GET_ORDER_BY_ID';

/**
 * INITIAL STATE
 */
const currentOrders = [];

/**
 * ACTION CREATORS
 */
export const getOrders = orders => ({ type: GET_ORDERS, orders });
export const createOrder = order => ({ type: CREATE_ORDER, order });
export const deleteOrder = id => ({ type: DELETE_ORDER, id });
export const updateOrder = order => ({ type: UPDATE_ORDER, order });
export const getOrderById = id => ({ type: GET_ORDER_BY_ID, id})

/**
 * THUNK CREATORS
 */
export const allOrdersThunk = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(getOrders(res.data || currentOrders)))
    .catch(err => console.log(err));
}

export const userOrdersThunk = id => dispatch => {
  axios.get(`/api/orders/${id}`)
  .then(res => dispatch(getOrderById(res.data)))
  .catch(err => console.log(err))
}


export const createOrderThunk = order => dispatch => {
  axios.post('/api/orders', order)
    .then(res => {
      dispatch(createOrder(res.data))
    })
    .catch(err => console.log(err));
}


export const updateOrderThunk = (order) => dispatch => {
  axios.put(`/api/orders/${order.id}`, order)
    .then(res => {
      dispatch(updateOrder(res.data))
      history.push('/orders')
    })
    .catch(err => console.log(err))
}

export const deleteOrderThunk = id => dispatch => {
  axios.delete(`/api/orders/${id}`)
    .then(() => dispatch(deleteOrder(id)))
    .catch(err => console.err(`Removing Order: ${id} unsuccessful.`));
}
/**
 * REDUCER
 */
export default function (state = currentOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case CREATE_ORDER:
      return [...state, action.order]
    case UPDATE_ORDER:
      let index = state.findIndex(order => order.id === action.id)
      let ordersCopy = state.slice(0)
      ordersCopy[index] = action.order
      console.log(ordersCopy[index], "UPDATED ORDER")
      return ordersCopy
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.id);
    case GET_ORDER_BY_ID :
      return state.filter(order => order.id === action.id);
    default:
      return state
  }
}
