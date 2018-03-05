import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDER_LINES = 'GET_ORDER_LINE';
const CREATE_ORDER_LINE = 'CREATE_ORDER_LINE';
const DELETE_ORDER_LINE = 'DELETE_ORDER_LINE';

/**
 * INITIAL STATE
 */
const currentOrderLines = [];

/**
 * ACTION CREATORS
 */
export const getOrderLines = orderLines => ({ type: GET_ORDER_LINES, orderLines });
export const createOrderLine = orderLine => ({type: CREATE_ORDER_LINE, orderLine});
export const deleteOrderLine = id => ({ type: DELETE_ORDER_LINE, id });

/**
 * THUNK CREATORS
 */
export const allOrderLineThunk = () => dispatch => {
  axios.get('/api/orderLine')
    .then(res => dispatch(getOrderLines(res.data || currentOrderLines)))
    .catch(err => console.log(err));
}

export const createOrderLineThunk = orderLine => dispatch => {
    console.log('creating orderLine');
    return axios.post('/api/orderLine', orderLine)
      .then(res => {
        dispatch(createOrderLine(res.data))
      })
      .catch(err => console.log(err));
  }

export const deleteOrderLineThunk = id => dispatch => {
  axios.delete(`/api/orderLine/${id}`)
    .then(() => dispatch(deleteOrderLine(id)))
    .catch(err => console.err(`Removing Order: ${id} unsuccessful.`));
}

/**
 * REDUCER
 */
export default function (state = currentOrderLines, action) {
  switch (action.type) {
    case GET_ORDER_LINES:
      return action.orderLines
    case CREATE_ORDER_LINE:
      return [...state, action.orderLine]
    case DELETE_ORDER_LINE:
      console.log(action)
      return state.filter(orderLine => orderLine.id !== action.id);
    default:
      return state
  }
}
