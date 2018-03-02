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
            <div className="userItem">
                <h1> {this.props.order.id}
                    &nbsp;&nbsp;&nbsp;
         {this.props.order.status}
                </h1>
                <button onClick={() => this.props.handleDeleteOrder(order.id)}>
                    Delete
          <span />
                </button>
                <button >
                    Edit
          <span />
                </button>
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
