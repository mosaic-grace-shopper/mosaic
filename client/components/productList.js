import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {allProducts, addProductThunk } from '../store';
import ProductItem from './productItem';


//logic to add a product will go here 


 class ProductList extends Component {

  componentDidMount () {
    this.props.getAllProducts()
  }

  render () {
    const theProducts = this.props.products;

    if (!theProducts.length) return  <div>No products found</div> 
    return (
      <div className="productList">
        <h1>Featured Artists</h1>
        <div className="aProduct">
         {theProducts.map(product => (
            <Link to={`products/${product.id}`} key={product.id} className="productCard">
              <ProductItem theProduct={product} />
            </Link>
          ))}


        </div>
          <form onSubmit = { this.props.handleClick } >
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
            <label htmlFor="imageUrl">
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
        <button>
          Add a Product
        </button>
          </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = ({products}) => ({products})

const mapDispatch = dispatch => ({
  getAllProducts: () => {
      dispatch(allProducts())
  },
  handleClick: (event) => {
    const newProduct = {
      artist: event.target.artist.value,
      title: event.target.title.value,
      description: event.target.description.value,
      price: +event.target.price.value,
      quantity: +event.target.quantity.value,
      imgUrl: event.target.imgUrl.value
    }
    dispatch(addProductThunk(newProduct))
  }
})

export default connect(mapState, mapDispatch)(ProductList);
