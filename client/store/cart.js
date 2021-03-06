import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_CART = 'DELETE_CART';

/**
 * INITIAL STATE
 */
const currentCart = {};

/**
 * ACTION CREATORS
 */
export const getCart = cart => ({ type: GET_CART, cart });
export const updateCart = cartItems => ({ type: UPDATE_CART, cartItems });
export const deleteCart = cart => ({type: DELETE_CART, cart});

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
      .then(res => {
        dispatch(updateCart(res.data))
        history.push('/cart')
      })
      .catch(err => console.log(err));

export const deleteCartThunk = () =>
  dispatch =>
    axios.delete('/api/cart')
      .then(res =>
        dispatch(deleteCart(res.data || currentCart)))
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
    case DELETE_CART:
      return action.cart
    default:
      return state
  }
}
