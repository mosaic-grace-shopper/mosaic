import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProductThunk } from "../store/products";

class EditProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.product.artist,
      description: this.props.product.description,
      imgUrl: this.props.product.imgUrl,
      price: this.props.product.price,
      quantity: this.props.product.quantity,
      title: this.props.product.title
    };
  }

  handleChange = event => {
      console.log("before state", this.state.product)
    this.setState({ [event.target.name]: event.target.value });
    console.log("after state", this.state.product)
  };

  render() {
    const product = this.props.product
    const productId = this.props.product.id;
    console.log("this.state", this.state);
    return (
      <div>
        <form onSubmit={ () => this.props.handleSubmit(event, this.state, productId)}>
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
            <label htmlFor="imageUrl">
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
            <button type="submit">Edit Product</button>
          </div>
        </form>
      </div>
    );
  }
}


const mapDispatch = dispatch => ({
  handleSubmit(event, product, productId) {
    event.preventDefault();
    dispatch(updateProductThunk(product, productId));
  }
});

export default connect(null, mapDispatch)(EditProductForm);

// export default EditProductForm
