import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { deleteOrderThunk, updateOrderThunk } from '../store/orders'

function OrderItem(props) {

    const { order, products } = props

    return (
        <div className="list-group-item , btn-toolbar">
            <ul><li><b>Order Id:</b> #{order.id}</li>
                <li><b>Status:</b> {order.status}</li>
                <li><b>Total:</b> ${order.total}</li>
                <li><b>Email:</b> {order.shipmentDetail && order.shipmentDetail.confirmationEmail}</li>
                <li><b>Recipient Name:</b> {order.shipmentDetail && order.shipmentDetail.recipientName}</li>
                <li><b>Shipping Address:</b> {order.shipmentDetail && order.shipmentDetail.shippingAddress}</li>
            </ul>
            <button className="btn btn-outline-danger btn-sm" onClick={() => props.handleDeleteOrder(order.id)}>
                Delete
                </button>
            <select name="orderStatus" key={order.id} defaultValue={order.status} onChange={(evt) => props.handleChange(evt, order)}>
                <option value="Saved">Saved</option>
                <option value="Submitted">Submitted</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
            </select>

            {
                order.orderlines.map(orderline => {
                    return (<ul key={orderline.id}>
                        <span>
                            &nbsp;&nbsp;&nbsp;
                            <h3> {products && products.find(product => product.id === orderline.productId).title}</h3>
                            Line Item Id: {orderline.productId}
                            &nbsp;&nbsp;&nbsp;
                            Line Item Price: ${orderline.linePrice}
                            &nbsp;&nbsp;&nbsp;
                            Line Item Quantity: {orderline.quantity}
                            &nbsp;&nbsp;&nbsp;
                             </span>

                    </ul>
                    )
                })
            }
        </div>
    );
}

const mapDispatch = dispatch => ({
    handleDeleteOrder: (orderId) => {
        dispatch(deleteOrderThunk(orderId));
    },
    handleChange: (evt, order) => {
        evt.preventDefault()
        console.log(order, "ORDER")
        order.status = evt.target.value
        dispatch(updateOrderThunk(order))
    }
});

export default withRouter(connect(null, mapDispatch)(OrderItem));
