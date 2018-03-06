import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allProducts } from '../store';
import ProductItem from './productItem';
import NewProductForm from './newProduct';

const styles = {
  button: {
    margin: 12,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  container : {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
};

class ProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const { products, currentUser } = this.props;

    const isAdmin = !!currentUser.isAdmin;

    if (!products.length) return <div>No products found</div>;
    return (
      <div className="productList">
        <h1>Featured Artists</h1>
        <div className="row">
            <div className="container">
              {products.map(product => (
                <div className="col-xs-4" key={product.id}>
                <Link
                  to={`products/${product.id}`}
                  key={product.id}
                  className="productCard"
                >
                  <ProductItem product={product} />
                </Link>
                </div>
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
