import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

export default function Checkout(props) {
    return (
        <div>
            <h1>Checkout</h1>
            <form>
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
                    <label htmlFor="recipientName">
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
                <button>Submit Order</button>
            </form>
        </div>
    )
}

