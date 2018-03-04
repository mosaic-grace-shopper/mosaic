import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allOrdersThunk } from '../store';
import OrderItem from './orderItem'

class OrderList extends Component {

  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    const { orders, user } = this.props;
    if (!user.isAdmin) return <h1> Only Admin has access to this Page </h1>
    if (!orders.length) return <div>No Orders found</div>
    return (
      <div className="orderList">
        <h1>Manage Orders</h1>
        <div className="aOrder">
          {orders.map(order => (
            <div key={order.id}>
              <Link to={`orders/${order.id}`} className="orderCard">
                <OrderItem order={order} />
              </Link>
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
const mapState = ({ orders, user }) => ({ orders, user })

const mapDispatch = dispatch => ({
  getAllOrders: () => {
    dispatch(allOrdersThunk())
  }
})

export default connect(mapState, mapDispatch)(OrderList);
