import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductThunk } from '../store/products';

class NewProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          artist: "",
          description: "",
          imgUrl: "http://www.collielife.com/Photographs/Puppyads/may17/aldredelie2.jpg",
          price: 0,
          quantity: 0,
          title: "",
          categoryId: 1
        };
      }

    render() {

    return (

          <form onSubmit={ this.props.handleClick } >
          <div>
              <label htmlFor="artist">
                <small>Product Artist</small>
              </label>
              <input
                onChange={this.handleChange}
                value={this.props.artist}
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
                value={this.props.description}
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
                value={this.props.imgUrl}
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
                value={this.props.price}
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
                value={this.props.quantity}
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
                value={this.props.title}
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
                value={this.props.categoryId}
                name="categoryId"
                type="number"
              />
            </div>
          <button type="submit">
            Add a Product
          </button>
            </form>
)
}
}



const mapDispatch = (dispatch) => ({
  handleClick: (event) => {
    event.preventDefault()
    const newProduct = {
      artist: event.target.artist.value,
      description: event.target.description.value,
      price: +event.target.price.value,
      quantity: +event.target.quantity.value,
      categoryId: +event.target.categoryId.value
    }
    if (event.target.title.value !== '') {
      newProduct.title = event.target.title.value
    }
    if (event.target.imgUrl.value !== '') {
      newProduct.imgUrl = event.target.imgUrl.value;
    }
    dispatch(addProductThunk(newProduct))
  }
})


export default connect(null, mapDispatch)(NewProductForm)
