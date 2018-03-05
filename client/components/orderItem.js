import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteOrderThunk } from '../store/orders'

function OrderItem(props) {

    const { order, products } = props

    return (
        <div className="list-group-item , btn-toolbar">
            <p> Order Id: {order.id}
                &nbsp;&nbsp;&nbsp;
                   Status: {order.status}
                &nbsp;&nbsp;&nbsp;
                   Total: ${order.total}
            </p>
            <button className="btn btn-outline-danger btn-sm" onClick={() => props.handleDeleteOrder(order.id)}>
                Delete
                </button>

            {
                order.orderlines.map(orderline => {
                    return (<ul key={orderline.id}>
                        <li>
                            &nbsp;&nbsp;&nbsp;
                            Line Item Id: {orderline.id}
                            &nbsp;&nbsp;&nbsp;
                            Line Item Name: <h1> {/*products && products.find(product => product.id === orderline.id).title*/}</h1>
                            &nbsp;&nbsp;&nbsp;
                            Line Item Price: ${orderline.linePrice}
                            &nbsp;&nbsp;&nbsp;
                            Line Item Quantity: {orderline.quantity}
                            &nbsp;&nbsp;&nbsp;
                             </li>
                    </ul>
                    )
                })
            }
        </div>
    );
}

// const mapState = state => {
//     return {
//         product: state.products
//     }
// }

const mapDispatch = dispatch => ({
    handleDeleteOrder: (orderId) => {
        dispatch(deleteOrderThunk(orderId));
    }
});

export default connect(null, mapDispatch)(OrderItem);
