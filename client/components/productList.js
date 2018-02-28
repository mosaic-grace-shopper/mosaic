import React, {Component} from 'react';
// import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {allProducts} from '../store';
import ProductItem from './productItem';


 class ProductList extends Component {

  componentDidMount () {
    this.props.getAllProducts()
  }

  render () {
    const theProducts = this.props.products;

    return (
      <div className="productList">
        <h1>Products go in here</h1>
        <div className="aProduct">
          {theProducts.length < 1 ?
          <div>No products found</div> : theProducts.map(product => (
            <Link to={`products/${product.id}`} key={product.id} className="productCard">
              <ProductItem theProduct={product} />
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
const mapState = (state) => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
  getAllProducts() {
      dispatch(allProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(ProductList);
