import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Checkout } from './checkout'
import { getCartThunk, updateCartThunk, deleteCartThunk } from '../store'


class Cart extends Component {
    componentDidMount() {
        this.props.handleFetchCart()
    }

    render() {
        const cart = this.props.cart
        const products = this.props.products
        const cartItems = Object.getOwnPropertyNames(cart)
        const logged = this.props.isLoggedIn;
        const meUser = this.props.user;
        const orders = this.props.orders;
        console.log(meUser, orders);
        if (!cart) return <div>There are no items in your cart.</div>

        if (!logged) {
            return (
                <div>
                    <div>
                        <h1>My Cart</h1>
                        {
                            products.filter(product => cartItems.includes(String(product.id))).map(filteredProduct => (
                                <ul key={filteredProduct.id}>
                                    <li key={filteredProduct.id}><h3><em>{filteredProduct.title}</em> by {filteredProduct.artist}</h3>
                                        <h4>
                                            Quantity: {cart[filteredProduct.id]}
                                            <form onSubmit={this.props.handleSubmit}>
                                                <input type="hidden" name="id" value={filteredProduct.id} readOnly />
                                                <input type="number" name="quantity" step="1" defaultValue={cart[filteredProduct.id]} min="0" />
                                                <button>update quantity</button>
                                            </form>
                                        </h4>
                                        <h4>Unit Price: ${filteredProduct.price} </h4>

                                        <h4>Price: $
                                            {filteredProduct.price * cart[filteredProduct.id]}
                                        </h4>
                                    </li>
                                </ul>
                            )
                            )
                        }
                        <h1>Total: </h1>
                        {/*gotta finish totals!*/}
                        <button onClick={this.props.handleClick}>Empty your cart</button>
                    </div>
                    <Link to="/products"><button>Back to Products</button></Link>
                </div>
            )
        }
        else if (orders[0]) {
            return (
                <div>
                    <h1>Your cart</h1>
                    <h2>Hello, {meUser && meUser.email}</h2>
                    <h3>Your order is {orders[0].status}</h3>
                    <h4>Your total is {orders[0].total}</h4>
                    <h5>You are purchasing id#: {orders[0].orderlines[0] && orders[0].orderlines[0].productId}</h5>
                    {/* Get userID and get cart*/}
                </div>
            )
        } else {
            return (
                <div><h1>Go buy some things lunkhead.</h1></div>
            )
        }
    }
}

const mapState = function (state) {
    return {
        orders: state.orders,
        user: state.user,
        cart: state.cart,
        products: state.products,
        isLoggedIn: !!state.user.id,
    }
}

const mapDispatch = function (dispatch) {
    return {
        handleFetchCart() {
            dispatch(getCartThunk())
        },

        handleSubmit(evt) {
            evt.preventDefault();
            const newId = +evt.target.id.value;
            const orderLine = {
                [newId]: +evt.target.quantity.value
            }
            dispatch(updateCartThunk(orderLine))
        },
        handleClick(evt) {
            evt.preventDefault();
            dispatch(deleteCartThunk())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Cart))

/**
 * PROP TYPES
 */
Cart.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}
