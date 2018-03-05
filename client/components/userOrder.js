import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userOrdersThunk } from '../store';
import OrderItem from './orderItem'

class UserOrder extends Component {

  componentDidMount() {
    this.props.getUserOrders()
  }

  render() {
    const { orders, user, products, shipmentDetail } = this.props;
    if (!orders.length) return <div>No orders found. Add some things to your cart!</div>
    return (
      <div className="orderList">
        <h1>Manage Orders</h1>
        <div className="aOrder">
          {orders.map(order => (
            <div key={order.id}>
                <OrderItem order={order} products={products} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}


/**
 * CONTAINER
 */
const mapState = ({ orders, user, products }) => ({ orders, user, products })

const mapDispatch = dispatch => ({
  getUserOrders: () => {
    dispatch(userOrdersThunk())
  }
})

export default connect(mapState, mapDispatch)(UserOrder);