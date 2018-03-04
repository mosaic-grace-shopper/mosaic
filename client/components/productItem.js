import React, { Component } from "react";
import { connect } from "react-redux";

//logic to edit a product will go here

class ProductItem extends Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { theProduct, currentUser } = this.props;

    return (
      <div className="productItem">
        <h3>
          <b>{theProduct.title}</b> by {theProduct.artist}
        </h3>
        <h5>
          ${theProduct.price} - <i>{theProduct.quantity} available</i>
        </h5>
        <img src={theProduct.imgUrl} />
      </div>
    );
  }
}

const mapState = state => ({
  currentUser: state.user
});

const mapDispatch = dispatch => ({
  handleSubmit(event, state) {
    event.preventDefault();
    dispatch(editProductThunk(state, productId));
  }
});

export default connect(mapState, mapDispatch)(ProductItem);
