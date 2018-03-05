import axios from 'axios'

/**
 * INITIAL STATE
 */
const categories = [];

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

/**
 * ACTION CREATORS
 */
 export const getCategories = categories => ({type : GET_CATEGORIES,categories});
 export const addCategory = category => ({type : ADD_CATEGORY,category});
 export const deleteCategory = id => ({type : DELETE_CATEGORY, id});

/**
 * THUNK CREATORS
 */
 export const getCategoriesThunk = () => dispatch => 
      axios.get('/api/categories')
            .then(res => dispatch(getCategories(res.data || categories)))
            .catch(err => console.log(err)) 

 export const addCategoriesThunk = (newCategory, history) => dispatch => 
      axios.post('/api/categories', newCategory)
            .then(res => {
                dispatch(addCategory(res.data))
                history.push('/categories')
            })
            .catch(err => console.log(err))
 
 export const deleteCategoryThunk = id => dispatch => 
      axios.delete(`api/categories/${id}`)
            .then(res => dispatch(deleteCategory(id)))
            .catch(err => console.log(err))
 

export default  (state = categories,action) => {
    switch (action.type) {
        case GET_CATEGORIES:
          return action.categories
        case ADD_CATEGORY :
            return  [...state, action.category]
        case DELETE_CATEGORY:
          return state.filter(category => category.id !== action.id);
        default:
          return state
      }
    
}