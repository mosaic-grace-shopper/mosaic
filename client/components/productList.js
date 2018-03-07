import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allProducts } from '../store';
import ProductItem from './productItem';
import NewProductForm from './newProduct';

class ProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const { products, currentUser } = this.props;
    const isAdmin = !!currentUser.isAdmin;

    const layoutStyles = {
      padding: '5px'
    }

    if (!products.length) return <div>No products found</div>;
    return (
      <div className="productList">
        <h1>Featured Artists</h1>
        <div className="row">
          {products.map(product => (
            <div className="col-sm-4" key={product.id} style={layoutStyles}>
              <Link to={`products/${product.id}`} key={product.id} className="productCard">
                <ProductItem product={product} />
              </Link>
            </div>
          ))}
        </div>
        {isAdmin && <NewProductForm />}
      </div>
    );
  }
}

export const mapState = state => ({
  currentUser: state.user,
  products: state.products
});

export const mapDispatch = dispatch => ({
  getAllProducts: () => {
    dispatch(allProducts());
  }
});

export default connect(mapState, mapDispatch)(ProductList);
