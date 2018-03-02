import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getCartThunk } from '../store'


class Cart extends Component {
    componentDidMount() {
        this.props.handleFetchCart()
    }
    render() {
        const cart = this.props.cart
        const products = this.props.products
        const cartItems = Object.getOwnPropertyNames(cart)
        if (!cart) return <div>There are no items in your cart.</div>
        console.log('PROPS.CART: ', this.props.cart)
        console.log('PROPS.PRODUCTS:', this.props.products)
        console.log('CART PRODUCT IDs: ', cartItems);
        return (
            <div>
                <h1>My Cart</h1>
                {
                    products.filter(product => cartItems.includes(String(product.id))).map(cartItem =>
                        <ul key={cartItem.id}>
                        <li key={cartItem.id}><h3><em>{cartItem.title}</em> by {cartItem.artist}</h3>
                            <h4>Quantity: {cartItem.quantity}</h4>
                            <h4>Price: ${cartItem.price}</h4>
                        </li>
                        </ul>
                    )

                }
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        cart: state.cart,
        products: state.products
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