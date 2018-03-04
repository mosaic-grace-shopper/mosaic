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
      </div>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = ({products}) => ({products})

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
