import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const DELETE_ORDER = 'DELETE_ORDER';

/**
 * INITIAL STATE
 */
const currentOrders = [];

/**
 * ACTION CREATORS
 */
export const getOrders = orders => ({ type: GET_ORDERS, orders });
export const deleteOrder = id => ({ type: DELETE_ORDER, id });
/**
 * THUNK CREATORS
 */
export const allOrdersThunk = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(getOrders(res.data || currentOrders)))
    .catch(err => console.log(err));
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
    case DELETE_ORDER:
      console.log(action)
      return state.filter(order => order.id !== action.id);
    default:
      return state
  }
}
