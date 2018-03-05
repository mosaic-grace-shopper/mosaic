import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

/**
 * INITIAL STATE
 */
const currentOrders = [];

/**
 * ACTION CREATORS
 */
export const getOrders = orders => ({ type: GET_ORDERS, orders });
export const createOrder = order => ({type: CREATE_ORDER, order});
export const deleteOrder = id => ({ type: DELETE_ORDER, id });

/**
 * THUNK CREATORS
 */
export const allOrdersThunk = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(getOrders(res.data || currentOrders)))
    .catch(err => console.log(err));
}

export const createOrderThunk = order => dispatch => {
    return axios.post('/api/orders', order)
      .then(res => {
        dispatch(createOrder(res.data))
      })
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
    case CREATE_ORDER:
      return [...state, action.order]
    case DELETE_ORDER:
      console.log(action)
      return state.filter(order => order.id !== action.id);
    default:
      return state
  }
}
