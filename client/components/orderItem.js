import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteOrderThunk } from '../store/orders'

function OrderItem(props) {

    const { order, products } = props

    return (
        <div className="list-group-item , btn-toolbar">
            <ul><li>Order Id: {order.id}</li>
                <li>Status: {order.status}</li>
                <li>Total: ${order.total}</li>
                <li>Email: {order.shipmentDetail.confirmationEmail}</li>
                <li>Recipient Name: {order.shipmentDetail.recipientName}</li>
                <li>Shipping Address: {order.shipmentDetail.shippingAddress}</li>
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
