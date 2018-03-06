import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchReviews } from '../store'

class Reviews extends Component {
    componentDidMount() {
        this.props.handleFetchReviews()
    }
    render() {
        const { reviews, product } = this.props
        const reviewsToDisplay = reviews.filter(review => review.productId === product.id)
        return (
            <div>
            <hr />
                <h1>Reviews</h1>
                {reviewsToDisplay.map(review => <h3 key={review.id}>{review.title}</h3>)}
                {reviewsToDisplay.map(review => <h4 key={review.id}>Rating: {review.stars}</h4>)}
                {reviewsToDisplay.map(review => <p key={review.id}>{review.text}</p>)}
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        reviews: state.reviews
    }
}

const mapDispatch = function (dispatch) {
    return {
        handleFetchReviews() {
            dispatch(fetchReviews())
        }
        // handleSubmit(evt){
        //     evt.preventDefault()
        //     const newReview = {
        //         title: evt.target.title.value,
        //         text: evt.target.text.value,
        //         stars: evt.target.confirmationEmail.stars
        //     }
        //     dispatch(addNewShipmentDetailsThunk(newReview))
        // }
    }
}

export default connect(mapState, mapDispatch)(Reviews)


// <form /*onSubmit={props.handleSubmit}*/>
//                     <div>
//                         <label htmlFor="title">
//                             <small>Title</small>
//                         </label>
//                         <input
//                             name="title"
//                             type="text"
//                             size="50"
//                         />

//                     </div>
//                     <br />
//                     <div>
//                         <label htmlFor="text">
//                             <small>Review Text</small>
//                         </label>
//                         <input
//                             name="text"
//                             type="text"
//                             size="50"
//                         />

//                     </div>
//                     <br />
//                     <div>
//                         <label htmlFor="stars">
//                             <small>Number of Stars</small>
//                         </label>
//                         <input
//                             name="stars"
//                             type="number"
//                             size="50"
//                         />

//                     </div>
//                     <button type="submit">Post Review</button>
//                 </form>