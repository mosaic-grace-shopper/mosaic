import React, { Component } from 'react'
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
        if (!cart) return <div>There are no items in your cart.</div>

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
              <tbody>
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
                    </tbody>
                    <h1>Total: </h1>
                    <button onClick={this.props.handleClick}>Empty your cart</button>
                </div>
                <Link to="/products"><button>Back to Products</button></Link>
            </div>
        )
    }
}



// (filteredProduct => (
//     <ul key={filteredProduct.id}>
//         <li key={filteredProduct.id}><h3><em>{filteredProduct.title}</em> by {filteredProduct.artist}</h3>
//             <h4>
//                 Quantity: {cart[filteredProduct.id]}
//                 <form onSubmit={this.props.handleSubmit}>
//                     <input type="hidden" name="id" value={filteredProduct.id} readOnly />
//                     <input type="number" name="quantity" step="1" defaultValue={cart[filteredProduct.id]} min="0" />
//                     <button>update quantity</button>
//                 </form>
//             </h4>
//             <h4>Unit Price: ${filteredProduct.price} </h4>

//             <h4>Price: $
// {filteredProduct.price * cart[filteredProduct.id]}
//             </h4>
//         </li>
//     </ul>
// )
// )
// }



const mapState = function (state) {
    return {
        cart: state.cart,
        products: state.products,
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
