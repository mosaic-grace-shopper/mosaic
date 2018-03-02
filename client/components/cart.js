import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getCartThunk } from '../store'


class Cart extends Component {
    componentDidMount() {
        this.props.handleFetchCart()
    }
    render() {
        console.log(this.props.cartItems, "PROPS.CARTITEMS")
        return (
            <div>
                <h1>My Cart</h1>
                {/*cartItems.map(cart => <h1 key={cart}>{cart}</h1>)*/}
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        cartItems: state.cartItems
    }
}

const mapDispatch = function (dispatch) {
    return {
        handleFetchCart() {
            dispatch(getCartThunk())
        }
    }
}

export default connect(mapState, mapDispatch)(Cart)
