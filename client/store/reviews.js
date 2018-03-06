import axios from 'axios'

const currentReviews = []


const GET_REVIEWS = 'GET_REVIEWS'

export const getReviews = reviews => ({ type: GET_REVIEWS, reviews })

export const fetchReviews = () =>
    dispatch =>
        axios.get('/api/reviews')
            .then(res => dispatch(getReviews(res.data)))
            .catch(err => console.log(err))

// export const addReviewThunk = (newReview) => 
// dispatch => {
//     axios.post('/api/reviews')
//     .then(res => dispatch)
// }


export default function (state = currentReviews, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews
        default:
            return state
    }
}
