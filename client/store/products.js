import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';

/**
 * INITIAL STATE
 */
const currentProducts = [];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products});

/**
 * THUNK CREATORS
 */
export const allProducts = () =>
  dispatch =>
    axios.get('/api/products')
    .then(res =>
      dispatch(getProducts(res.data || currentProducts)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = currentProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...currentProducts, ...action.products]
    default:
      return state
  }
}
