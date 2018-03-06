import axios from 'axios'

const currentReviews = []


const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

export const getReviews = reviews => ({ type: GET_REVIEWS, reviews })
export const addReview = review => ({ type: ADD_REVIEW, review })

export const fetchReviews = () =>
    dispatch =>
        axios.get('/api/reviews')
            .then(res => dispatch(getReviews(res.data)))
            .catch(err => console.log(err))

export const addReviewThunk = (newReview) =>
    dispatch => {
        axios.post('/api/reviews', newReview)
            .then(res => dispatch(addReview(res.data)))
            .catch(err => console.log(err))
    }


export default function (state = currentReviews, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews
        case ADD_REVIEW:
            return [...state, action.review]
        default:
            return state
    }
}
