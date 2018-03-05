import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteOrderThunk } from '../store/orders'

function OrderItem(props) {

    const { order, products } = props
    //maybe variable for order.shipmentDetail, not imprnt in any way --KHEJ
    return (
        <div className="list-group-item , btn-toolbar">
            <ul><li><b>Order Id:</b> #{order.id}</li>
                <li><b>Status:</b> {order.status}</li>
                <li><b>Total:</b> ${order.total}</li>
                <li><b>Email:</b> {order.shipmentDetail.confirmationEmail}</li>
                <li><b>Recipient Name:</b> {order.shipmentDetail.recipientName}</li>
                <li><b>Shipping Address:</b> {order.shipmentDetail.shippingAddress}</li>
            </ul>
            {/*only if isAdmin, show button -- KHEJ*/}
            <button className="btn btn-outline-danger btn-sm" onClick={() => props.handleDeleteOrder(order.id)}>
                Delete
                </button>

            {
                order.orderlines.map(orderline => {
                    //move the UL outside of the map so not creating new list each time, <li> as child tag not span, or may not want a UL at all -- KHEJ
                    return (<ul key={orderline.id}>
                        <span>
                        {/*move to CSS --KHEJ*/}
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
