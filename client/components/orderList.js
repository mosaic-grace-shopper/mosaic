import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {allOrdersThunk} from '../store';

 class OrderList extends Component {

    componentDidMount () {
        this.props.getAllOrders()
    }

    render() {
        const theOrders = this.props.orders;
    if (!theOrders.length) return  <div>No Orders found</div> 
    return (
      <div className="productList">
        <h1>Orders Goes in here</h1>
        <div className="aProduct">
         {theOrders.map(order => (
            <Link to={`orders/${order.id}`} key={order.id} className="orderCard">
            </Link>
          ))}
        </div>
      </div>
    );
  }
 }


/**
 * CONTAINER
 */
const mapState = ({orders}) => ({orders})

const mapDispatch = dispatch => ({
    getAllOrders: () => {
      dispatch(allOrdersThunk())
  }
})

export default connect(mapState, mapDispatch)(OrderList);
  