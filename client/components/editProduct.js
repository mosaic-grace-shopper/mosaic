import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProductThunk, deleteProductThunk } from "../store/products";
import productItem from "./productItem";

class EditProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.product.artist,
      description: this.props.product.description,
      imgUrl: this.props.product.imgUrl,
      price: this.props.product.price,
      quantity: this.props.product.quantity,
      title: this.props.product.title,
      categoryId: this.props.product.categoryId
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRemove = (productId) => {
    this.props.removeTheProduct(productId);
  }

  render() {
    const product = this.props.product
    const productId = this.props.product.id;
    return (
      <div>
        <form className="form-group" onSubmit={this.props.handleClick}>
          <div>
            <label htmlFor="artist">
              <small>Product Artist</small>
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.artist}
              name="artist"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="description">
              <small>Description</small>
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="imgUrl">
              <small>imageUrl</small>
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.imgUrl}
              name="imgUrl"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.price}
              name="price"
              type="number"
              step="1"
            />
          </div>
          <div>
            <label htmlFor="quantity">
              <small>Product Quantity</small>
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.quantity}
              name="quantity"
              type="text"
            />
          </div>

          <div>
            <label htmlFor="title">
              <small>Product Title</small>
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.title}
              name="title"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="title">
              <small>Product Category</small>
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.categoryId}
              name="categoryId"
              type="number"
            />
          </div>
          <button type="submit">Edit Product</button>
        </form>

         <button onClick={() => this.handleRemove(productId)}>
          Delete Product
          </button>
      </div>
    );
  }
}


const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(event) {
    event.preventDefault();
    const productId = ownProps.product.id
    const editedProduct = {
      artist: event.target.artist.value,
      title: event.target.title.value,
      description: event.target.description.value,
      price: +event.target.price.value,
      quantity: +event.target.quantity.value,
      imgUrl: event.target.imgUrl.value,
      categoryId: +event.target.categoryId.value
    };
    dispatch(updateProductThunk(editedProduct, productId));
  },
  removeTheProduct: (productId) => {
    dispatch(deleteProductThunk(productId));
  }
});

export default connect(null, mapDispatch)(EditProductForm);
