import React, {Component} from 'react';
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {allProducts} from '../store'


 class ProductList extends Component {

  componentDidMount () {
    this.props.getAllProducts()
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Products go in here</h1>
        <h3>{this.props.products && this.props.products[0].title}</h3>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state);
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
