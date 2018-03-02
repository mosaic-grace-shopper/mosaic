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
        console.log(this.props.cart, "PROPS.CART")
        console.log(this.props.products, "PROPS.PRODUCTS")
        console.log("CART PRODUCT IDs: ", Object.getOwnPropertyNames(cart));
        return (
            <div>
                <h1>My Cart</h1>
              {console.log("HELLO: ", products.find(product => product.id === +cartItems[1]))}
              
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

// <h1>{products.find(product => product.id === 1).title}</h1>