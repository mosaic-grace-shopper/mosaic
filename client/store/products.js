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
    axios.get('/api/products') // consider indentation -- kHEJ
    .then(res =>
      dispatch(getProducts(res.data || currentProducts))) // maybe if we are getting nothing back we should be updating to nothing -- KHEJ
    .catch(err => console.log(err)); // fine for now; consider showing the user something went wrong (growl, toaster....) -- KHEJ

/**
 * REDUCER
 */
export default function (state = currentProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...currentProducts, ...action.products] // potentially jsut return action.products -- KHEJ 
    default:
      return state
  }
}
