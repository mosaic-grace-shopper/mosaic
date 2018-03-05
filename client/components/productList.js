import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { allProducts, addProductThunk } from "../store";
import ProductItem from "./productItem";
import NewProductForm from "./newProduct";

//logic to add a product will go here

class ProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const theProducts = this.props.products;
<<<<<<< HEAD

    const { currentUser } = this.props;
    const isAdmin = !!currentUser.isAdmin;

    if (!theProducts.length) return <div>No products found</div>;
    return (
      <div className="productList">
        <h1>Featured Artists</h1>
        <div className="row">
          
            <div className="aProduct">
              {theProducts.map(product => (
                <Link
                  to={`products/${product.id}`}
                  key={product.id}
                  className="productCard"
                >
                  <ProductItem theProduct={product} />
                </Link>
              ))}
         
          </div>
        </div>
        {isAdmin && <NewProductForm />}
=======
    const categoryProduct = theProducts.filter(theProduct => theProduct.category.id === 2)
    if (!theProducts.length) return  <div>No products found</div> 
    return (
      <div className="productList">
        <h1>Featured Products</h1>
        <div className="aProduct">
         {theProducts.map(product => (
            <Link to={`products/${product.id}`} key={product.id} className="productCard">
              <ProductItem theProduct={product} />
            </Link>
          ))}

        </div>
          <form onSubmit={ this.props.handleClick } >
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
>>>>>>> master
      </div>
    );
  }
}

/**
 * CONTAINER
 */
<<<<<<< HEAD
// const mapState = ({products}) => ({products})

const mapState = state => ({
  currentUser: state.user,
  products: state.products
});

const mapDispatch = dispatch => ({
  getAllProducts: () => {
    dispatch(allProducts());
=======
const mapState = ({products} , ownProps) => ({products})

const mapDispatch = dispatch => ({
  getAllProducts: () => {
      dispatch(allProducts())
  },
  handleClick: (event) => {
    event.preventDefault()
    const newProduct = {
      artist: event.target.artist.value,
      title: event.target.title.value,
      description: event.target.description.value,
      price: +event.target.price.value,
      quantity: +event.target.quantity.value,
      imgUrl: event.target.imgUrl.value,
      categoryId: +event.target.categoryId.value
    }
    dispatch(addProductThunk(newProduct))
>>>>>>> master
  }
});

export default connect(mapState, mapDispatch)(ProductList);
