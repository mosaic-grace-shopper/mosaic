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
const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({type: GET_PRODUCTS, products});
export const editProduct = product => ({type: EDIT_PRODUCT, product });
export const addProduct = product => ({type: ADD_PRODUCT, product});
export const deleteProduct = id => ({type: DELETE_PRODUCT, id});

/**
 * THUNK CREATORS
 */
export const allProducts = () =>
  dispatch => 
    axios.get('/api/products')
    .then(res =>
      dispatch(getProducts(res.data || currentProducts)))
    .catch(err => console.log(err));

export const updateProductThunk = (product, id) => dispatch => {
  axios.put(`/api/product/${id}`, product)
  .then(res => {
  dispatch(editProduct(res.data))
  })
  .catch(err => console.log(err))
}


export const addProductThunk = (newProduct) => dispatch => { 
  axios.post('/api/products', newProduct)
  .then(res => {
    dispatch(addProduct(res.data))
    history.push('/products')
  })
  .catch(err => console.log(err))
}

export const deleteProductThunk = (id) => dispatch => {
  axios.delete(`/api/products/${id}`)
  .then(() => {
    dispatch(deleteProduct(id))
    // history.push('/products')
  })
  .catch(err=> console.error(`Removing product: ${id} unsuccessful.`))
}


/**
 * REDUCER
 */
export default function (state = currentProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case EDIT_PRODUCT:
      return state.map(product => ( action.product.id  === product.id ? action.product : product))
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.id)
    default:
      return state
  }
}
