import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { allOrdersThunk } from '../store';
import OrderItem from './orderItem'

class OrderList extends Component {

  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    const { orders, user, products, shipmentDetail } = this.props;
    // if (!user.isAdmin) return <h1> Only admins have access to this page </h1>
    if (!orders.length) return <div>No orders found</div>
<<<<<<< HEAD
    const myOrders = user.isAdmin ? orders : orders.filter(order => order.userId === user.id) 
=======
    console.log(orders, "NEW ORDERS!")
>>>>>>> master
    return (
      <div className="orderList">
        <h1>Manage Orders</h1>
        <div className="aOrder">
        { myOrders.map(order => (
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
  getAllOrders: () => {
    dispatch(allOrdersThunk())
  }
})

export default withRouter(connect(mapState, mapDispatch)(OrderList));
