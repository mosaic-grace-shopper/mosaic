import React, {Component} from 'react';
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

    if (!theProducts.length) return  <div>No products found</div> 
    return (
      <div className="productList">
        <h1>Products go in here</h1>
        <div className="aProduct">
         {theProducts.map(product => (
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
const mapState = ({products}) => ({products})

const mapDispatch = dispatch => ({
  getAllProducts: () => {
      dispatch(allProducts())
  }
})

export default connect(mapState, mapDispatch)(ProductList);
