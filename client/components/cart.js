import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getCartThunk, updateCartThunk } from '../store'


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
                <div>
                    <h1>My Cart</h1>
                    {
                        products.filter(product => cartItems.includes(String(product.id))).map(cartItem => (
                            <ul key={cartItem.id}>
                                <li key={cartItem.id}><h3><em>{cartItem.title}</em> by {cartItem.artist}</h3>
                                    <h4>
                                        Quantity: {cartItem.quantity}
                                        <form onSubmit={this.props.handleSubmit}><input type="number" name="quantity" step="1" defaultValue={cartItem.quantity} min="0"  /><button>update quantity</button> </form>
                                    </h4>
                                    <h4>Price: ${cartItem.price}</h4>
                                </li>
                            </ul>
                        )
                    )
                }
                <h1>Total: </h1>
                </div>
                <Link to="/products"><button>Back to Products</button></Link>
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

const mapDispatch = function (dispatch, ownProps) {
    return {
        handleFetchCart() {
            dispatch(getCartThunk())
        },
        handleSubmit(evt) {
            evt.preventDefault();
            const newId = ownProps.match.params.id;
            console.log(ownProps.match.params.id);
            const orderLine = {
                [newId]: +evt.target.quantity.value
            }
            dispatch(updateCartThunk(orderLine))
        }
    }
}

export default connect(mapState, mapDispatch)(Cart)
