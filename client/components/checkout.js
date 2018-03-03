import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {addNewShipmentDetailsThunk} from '../store'

function Checkout(props) {
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
        }
    }
}

export default connect(null, mapDispatch)(Checkout)
