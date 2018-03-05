import React, { Component } from "react";
import { connect } from "react-redux";


class ProductItem extends Component {


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


export default connect(mapState)(ProductItem);
