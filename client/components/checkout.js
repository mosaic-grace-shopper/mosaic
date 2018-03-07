import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {addNewShipmentDetailsThunk} from '../store'

function Checkout(props) {

    console.log(props.cart, "CARTTTT")
    console.log(props.products, "PRODUCTS 4 UPDATE")
    const cartKey = Object.keys(props.cart);
    const prodsBefore = props.products;
    const prodsAfter = [];

    for (let i = 0; i < prodsBefore.length; i++) {
        console.log(cartKey, "is cart key");
        console.log(String(prodsBefore[i].id), "is prodsBefore id");
        if (cartKey.includes(String(prodsBefore[i].id))) {
            console.log('I am doing it');
            prodsAfter.push(prodsBefore[i])
        }
    }
    console.log(prodsAfter);

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor="recipientName">
                        <small>Recipient Name</small>
                    </label>
                    <input
                        name="recipientName"
                        type="text"
                        size="50"
                    />

                </div>
                <br />
                <div>
                    <label htmlFor="shippingAddress">
                        <small>Shipping Address</small>
                    </label>
                    <input
                        name="shippingAddress"
                        type="text"
                        size="50"
                    />

                </div>
                <br />
                <div>
                    <label htmlFor="confirmationEmail">
                        <small>Confirmation Email</small>
                    </label>
                    <input
                        name="confirmationEmail"
                        type="text"
                        size="50"
                    />

                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    )
}

const mapState = function(state){
    return {
        cart: state.cart,
        products: state.products
    }
}

const mapDispatch = function(dispatch){
    return {
        handleSubmit(evt){
            evt.preventDefault()
            const newShipment = {
                recipientName: evt.target.recipientName.value,
                shippingAddress: evt.target.shippingAddress.value,
                confirmationEmail: evt.target.confirmationEmail.value
            }
            dispatch(addNewShipmentDetailsThunk(newShipment))
            //update product thunk for each thing in prodsAfter();
        }
    }
}

export default connect(mapState, mapDispatch)(Checkout)
