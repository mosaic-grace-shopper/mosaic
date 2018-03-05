import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteOrderThunk } from '../store/orders'

class OrderItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { order } = this.props;
        return (
            <div className="list-group-item , btn-toolbar">
                <p> Order Id = {this.props.order.id}
                    &nbsp;&nbsp;&nbsp;
                   Status = {this.props.order.status}
                    &nbsp;&nbsp;&nbsp;
                   Total = {this.props.order.total}
                </p>
                <button className="btn btn-outline-danger btn-sm" onClick={() => this.props.handleDeleteOrder(order.id)}>
                    Delete
                </button>
                <button className="btn btn-outline-primary btn-sm">
                    Edit
                </button>

                {
                    this.props.order.orderlines.map(orderline => {
                        return <ul key={orderline.id}> 
                            <li> 
                            Line Id = {orderline.id} 
                            &nbsp;&nbsp;&nbsp;
                            Line Price = {orderline.linePrice} 
                            &nbsp;&nbsp;&nbsp;
                            Line Quantity = {orderline.quantity} 
                            &nbsp;&nbsp;&nbsp;
                             </li>
                        </ul>
                    })
                }
            </div>
        );
    }
}

const mapDispatch = dispatch => ({
    handleDeleteOrder: (orderId) => {
        dispatch(deleteOrderThunk(orderId));
    }
});

export default connect(null, mapDispatch)(OrderItem);
