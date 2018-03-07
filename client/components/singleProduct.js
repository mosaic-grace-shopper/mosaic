import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { updateCartThunk } from '../store/cart';
import  EditProductForm   from './editProduct';
import { updateOrderLineThunk } from '../store/orderLine';


// probably needs to be a stateful component?
class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      imgUrl: ''
    };
  }

  render() {
    const { currentUser } = this.props;
    const product = this.props.singleProduct;

    if (!product) return <div />;
    const isAdmin = !!currentUser.isAdmin

    if (!this.props.isLoggedIn) {
      return (
        <div>
          <h2> Artist: {product.artist}</h2>
          <h1>{product.title}</h1>
          <img src={product.imgUrl} />
          <h4>{product.description}</h4>
          <h4>${product.price}</h4>
          <h4>
            <em>{product.quantity} available</em>
          </h4>
            <form onSubmit={this.props.handleAnonSubmit}>
              <input
                type="number"
                name="quantity"
                step="1"
                defaultValue="1"
                min="1"
                max={product.quantity}
              />
              <button>Buy this Item</button>
            </form>
          <button>
            <Link to="/products">Back to Products</Link>
          </button>
          {isAdmin && <EditProductForm history={this.props.history} product={product} />}
        </div>)
    } else if (this.props.isLoggedIn) {
      return (
        <div>
          <h2> Artist: {product.artist}</h2>
          <h1>{product.title}</h1>
          <img src={product.imgUrl} />
          <h4>{product.description}</h4>
          <h4>${product.price}</h4>
          <h4>
            <em>{product.quantity} available</em>
          </h4>
          {this.props.orders && this.props.orders.orderlines > 0 ?
            <form onSubmit={this.props.handleLoggedInSubmit}>
              <input type="number" name="orderLineId" value={this.props.orders.orderlines[0].id} readOnly />
              <input type="number" name="orderId" value={this.props.orders.id} readOnly />
              <input
                type="number"
                name="quantity"
                step="1"
                defaultValue="1"
                min="1"
                max={product.quantity}
              />
              <button>Buy this Item</button>
            </form>
            : <form onSubmit={this.props.handleAnonSubmit}>
            <input
              type="number"
              name="quantity"
              step="1"
              defaultValue="1"
              min="1"
              max={product.quantity}
            />
            <button>Buy this Item</button>
          </form>
          }
          <button>
            <Link to="/products">Back to Products</Link>
          </button>
          {isAdmin && <EditProductForm history={this.props.history} product={product} />}
        </div>
      );
    }
  }
}

const mapState = function(state, ownProps) {
  return {
    isLoggedIn: !!state.user.id,
    singleProduct: state.products.find(
      product => product.id === +ownProps.match.params.id
    ),
    currentUser: state.user,
    orders: state.orders.filter(order => order.status === 'Saved')
  };
};


const mapDispatch = function(dispatch, ownProps) {
  return {
    handleAnonSubmit(evt) {

      evt.preventDefault();
      const newId = ownProps.match.params.id;
      const orderLine = {
        [newId]: +evt.target.quantity.value
      };
      dispatch(updateCartThunk(orderLine));
    },

    handleLoggedInSubmit(evt) {
      evt.preventDefault();
      const productId = +ownProps.match.params.id;
      const orderId = +evt.target.orderId.value;
      const orderLineId = +evt.target.orderLineId.value;

      const updatedOrderLine = {
        id: orderLineId,
        quantity: +evt.target.quantity.value,
        orderId: orderId,
        productId: productId
      }

      console.log(updatedOrderLine);

      dispatch(updateOrderLineThunk(updatedOrderLine));

      //update orderline array on orders....
      //call updateOrderThunk with --- maybe not

      //get orderID from state
      //find orderline where orderID and productID from form match
      // ....
      //call update orderLineThunk with the correct quantity, orderID, productID


    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));
