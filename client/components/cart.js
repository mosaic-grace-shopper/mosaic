import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Checkout } from './checkout'
import { getCartThunk, updateCartThunk, deleteCartThunk } from '../store'
import { Login } from '.';



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
        if (!cart) return <div>There are no items in your cart.</div>
        if (!logged) {
            return (
                <div>
                    <h1>My Cart</h1>
                        <div className="table">
                        <thead>
                        <tr>
                            <th scope="col"> Line # </th>
                            <th scope="col"> Product </th>
                            <th scope="col">Discription </th>
                            <th scope="col">Artist </th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Line Total</th>
                        </tr>
                        </thead>
                        {
                            products.filter(product => cartItems.includes(String(product.id))).map(filteredProduct => (
        
                                <tr key={filteredProduct.id}>
                                <th scope="row">1</th>
                                <td>{filteredProduct.title}</td>
                                <td>{filteredProduct.description}</td>
                                <td>{filteredProduct.artist}</td>
                                <td>${filteredProduct.price}</td>
                                <td> <form onSubmit={this.props.handleSubmit}>
                                <input type="hidden" name="id" value={filteredProduct.id} readOnly />
                                <input type="number" name="quantity" step="1" defaultValue={cart[filteredProduct.id]} min="0" />
                                <button>update quantity</button>
                                </form> </td>
                                <td> {filteredProduct.price * cart[filteredProduct.id]}</td>
                              </tr> ))
                        }
                        <h1>Total: </h1>
                        {/*gotta finish totals!*/}
                        <button onClick={this.props.handleClick}>Empty your cart</button>
                        <button onClick={() => this.props.handleCheckout(logged)}>Checkout</button>
                    </div>
                    <Link to="/products"><button>Back to Products</button></Link>
                </div>
            )
        }
        else if (orders[0]) {
            return (
                <div>
                <h1>My Cart</h1>
                    <div className="table" >
                    <thead>
                <tr>
                    <th scope="col" > Line # </th>
                    <th scope="col"> Product </th>
                    <th scope="col">Discription </th>
                    <th scope="col">Artist </th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Line Total</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders ? orders.filter(order => order.userId === meUser.id).map(order => (order.orderlines.map(orderline => (
                        <tr key={orderline.id}>
                            <th scope="row">1</th>
                            <td>{orderline.product.title}</td>
                            <td>{orderline.product.description}</td>
                            <td>{orderline.product.artist}</td>
                            <td>${orderline.product.price}</td>
                            <td > <form onSubmit={this.props.handleSubmit}>
                            <input type="number" name="quantity" className="input-sm" step="1" defaultValue={orderline.quantity} min="0" max="100"/>
                            <button>Update</button>
                            <td> {orderline.lineTotal} </td>
                            </form> </td>
                         </tr> ))))
                   : <div> <h4>No Pending Orders for you</h4>
                    </div>
                }
                </tbody>
                </div>
             </div>
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

const mapDispatch = function (dispatch , ownProps) {
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
        handleCheckout(isLoggedIn) {
            if(isLoggedIn) {
                ownProps.history.push('/checkout')
            } else {
                alert('Plese login to checkout');
                ownProps.history.push('/login')
            }
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
