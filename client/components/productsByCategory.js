import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { allProducts } from '../store'
import ProductItem from './productItem'
import NewProductForm from './newProduct'

class ProductsByCategory extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const { products, currentUser, filteredProducts } = this.props;
    const isAdmin = !!currentUser.isAdmin;

    if (!products.length) return <div>No products found</div>;
    return (
      <div className="productList">
        <h1>Featured Artists</h1>
        <div className="row">

            <div className="aProduct">
              {filteredProducts.map(product => (
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
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  currentUser: state.user,
  products: state.products,
  filteredProducts: state.products.filter(
    products => products.categoryId === +ownProps.match.params.id
  )
});

const mapDispatch = dispatch => ({
  getAllProducts: () => {
    dispatch(allProducts());
  }
});

export default connect(mapState, mapDispatch)(ProductsByCategory);
