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

    if (!products.length) return <div>No products found</div>;
    return (
      <div className="container is-fluid">
        <h1>Featured Artists</h1>
        <div className="rows">

            <div className="row">
              {products.map(product => (
                <Link
                  to={`products/${product.id}`}
                  key={product.id}
                  className=""
                >
                  <ProductItem theProduct={product} />
                </Link>
              ))}

          </div>
        </div>
        {isAdmin && <NewProductForm />}
      </div>
    );
  }
}



const mapState = state => ({
  currentUser: state.user,
  products: state.products
});

const mapDispatch = dispatch => ({
  getAllProducts: () => {
    dispatch(allProducts());
  }
});

export default connect(mapState, mapDispatch)(ProductList);
