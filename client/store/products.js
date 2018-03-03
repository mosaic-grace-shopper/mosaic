import axios from 'axios';

/**
 * INITIAL STATE
 */
const currentProducts = [];


/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';


/**
 * ACTION CREATORS
 */
export const getProducts = products => ({type: GET_PRODUCTS, products});
export const editProduct = product => ({type: EDIT_PRODUCT, product });
export const addProduct = product => ({type: ADD_PRODUCT, product});

/**
 * THUNK CREATORS
 */
export const allProducts = () =>
  dispatch => 
    axios.get('/api/products')
    .then(res =>
      dispatch(getProducts(res.data || currentProducts)))
    .catch(err => console.log(err));

export const updateProductThunk = (product, id) => 
  dispatch => { 
  axios.put(`/api/product/${id}`, product)
  .then(res => 
  dispatch(editProduct(res.data)))
  .catch(err => console.log(err))
}

export const addProductThunk = (newProduct) => dispatch => { 
  axios.post('/api/products', newProduct)
  .then(res => {
    dispatch(addProduct(res.data))
  })
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
      return state.map(product => (
        action.product.id  === product.id ? action.product : product
      ))
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
