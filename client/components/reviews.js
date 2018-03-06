import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchReviews, addReviewThunk } from '../store'

class Reviews extends Component {
    componentDidMount() {
        this.props.handleFetchReviews()
    }
    render() {
        const { reviews, product } = this.props
        console.log(product, "PRODUCT!!!! ")
        const reviewsToDisplay = reviews.filter(review => review.productId === product.id)
        return (
            <div>
                <hr />
                <h1>Reviews</h1>
                <br />
                <ul>
                    {reviewsToDisplay.map(review => <li key={review.id}>{review.title}</li>)
                }
                </ul>
                {reviewsToDisplay.map(review => <h5 key={review.id}>Rating: {review.stars}</h5>)}
                {reviewsToDisplay.map(review => <p key={review.id}>{review.text}</p>)}
                <br />
                <hr />
                <form onSubmit={(evt) => this.props.handleSubmit(evt, product)} >
                    <div>
                        <label htmlFor="title">
                            <small>Title</small>
                        </label>
                        <input
                            name="title"
                            type="text"
                            size="50"
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="text">
                            <small>Description</small>
                        </label>
                        <input
                            name="text"
                            type="text"
                            size="50"
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="stars">
                            <small>Number of Stars</small>
                        </label>
                        <input
                            name="stars"
                            type="number"
                            size="50"
                            min="1"
                            max="5"
                        />
                    </div>
                    <button type="submit">Post Review</button>
                </form>
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
        },
        handleSubmit(evt, product){
            evt.preventDefault()
            const newReview = {
                title: evt.target.title.value,
                text: evt.target.text.value,
                stars: evt.target.stars.value,
                productId: product.id
            }
            dispatch(addReviewThunk(newReview))
        }
    }
}

export default connect(mapState, mapDispatch)(Reviews)
