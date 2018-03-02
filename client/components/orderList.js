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
            <div>
            <Link to={`orders/${order.id}`} key={order.id} className="orderCard">
             <ul className="caption">
                  <div>{ order.id } &nbsp; &nbsp; &nbsp;
                  <span>{ order.status } &nbsp; &nbsp; &nbsp; </span>
                  </div>
              </ul>
            </Link>
              <button> ViewDetail </button>
              <button> Delete </button>
              &nbsp; &nbsp; &nbsp;
              <button> Edit </button>
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
const mapState = ({orders}) => ({orders})

const mapDispatch = dispatch => ({
    getAllOrders: () => {
      dispatch(allOrdersThunk())
  }
})

export default connect(mapState, mapDispatch)(OrderList);
  