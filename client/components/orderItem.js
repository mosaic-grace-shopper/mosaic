import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteOrderThunk } from '../store/orders'

function OrderItem(props) {

    const { order, products } = props

    return (
        <div className="list-group-item , btn-toolbar">
            <ul><li><b>Order Id:</b> #{order.id}</li>
                <li><b>Status:</b> {order.status}</li>
                <li><b>Total:</b> ${order.total}</li>
                <li><b>Email:</b> {order.shipmentDetail.confirmationEmail}</li>
                <li><b>Recipient Name:</b> {order.shipmentDetail.recipientName}</li>
                <li><b>Shipping Address:</b> {order.shipmentDetail.shippingAddress}</li>
            </ul>
            <button className="btn btn-outline-danger btn-sm" onClick={() => props.handleDeleteOrder(order.id)}>
                Delete
                </button>

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
    }
});

export default connect(null, mapDispatch)(OrderItem);
