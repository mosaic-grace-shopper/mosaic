import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

/**
 * INITIAL STATE
 */
const currentProducts = [];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products});
const editProduct = product => ({type: EDIT_PRODUCT, product });
const addProduct = product => ({type: ADD_PRODUCT, product});

/**
 * THUNK CREATORS
 */
export const allProducts = () =>
  dispatch =>
    axios.get('/api/products')
    .then(res =>
      dispatch(getProducts(res.data || currentProducts)))
    .catch(err => console.log(err));

export const updateProductThunk = (product, id) => {
  dispatch => 
  axios.put(`/api/product/${id}`, product)
  .then(res => 
  dispatch(editProduct(res.data)))
  .catch(err => console.log(err))
}

export const addProductThunk = (product) => {
  dispatch => 
  axios.post('/api/products', product)
  .then(res => 
  dispatch(addProduct(res.data)))
  .catch(err => console.log(err))
}


/**
 * REDUCER
 */
export default function (state = currentProducts, action) {
  console.log("Action", action)
  console.log("state", state)
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case EDIT_PRODUCT:
      return currentProducts.map(product => (
        action.product.id  === product.id ? action.product : product
      ))
    case ADD_PRODUCT:
      return [action.product, ...currentProducts]
    default:
      return state
  }
}
