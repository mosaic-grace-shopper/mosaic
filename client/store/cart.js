import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';

/**
 * INITIAL STATE
 */
const currentCart = {};

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart});
const updateCart = cartItems => ({type: UPDATE_CART, cartItems});

/**
 * THUNK CREATORS
 */
export const getCartThunk = () =>
  dispatch =>
    axios.get('/api/cart')
    .then(res =>
      dispatch(getCart(res.data || currentCart)))
    .catch(err => console.log(err));

export const updateCartThunk = (cartItems) =>
  dispatch =>
    axios.put('/api/cart', cartItems)
    .then(res =>
      dispatch(updateCart(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = currentCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cartItems
    default:
      return state
  }
}
