import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { updateCartThunk } from '../store/cart';


// probably needs to be a stateful component?
class SingleProduct extends Component {

    constructor(props){
        super(props)
        this.state = {
            artist: "",
            title: "",
            description: "",
            price: 0,
            quantity: 0,
            imgUrl: ""
        }
      }
      render () {

    const { currentUser } = this.props;
    const product = this.props.singleProduct


    if (!product) return <div />
    return (
        <div>
        <h2> Artist: {product.artist}</h2>
            <h1>{product.title}</h1>
            <img src={product.imgUrl} />
            <h4>{product.description}</h4>
            <h4>${product.price}</h4>
            <h4><em>{product.quantity} available</em></h4>
            <form onSubmit={this.props.handleSubmit}>
                <input type="number" name="quantity" step="1" defaultValue="1" min="1" max={product.quantity} />
                <button>Buy this Item</button>
            </form>
            <button><Link to="/products">Back to Products</Link></button>
       
            {/* {(currentUser && currentUser.isAdmin) ? */}
            <div>
                 <form onSubmit={ () => this.props.handleSubmit(state, event) } >
                <div>
                <label htmlFor="artist">
                  <small>Product Artist</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.artist}
                  name="artist"
                  type="text"
                />
                <div>
                  </div>
                <label htmlFor="title">
                  <small>Product Title</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.title}
                  name="title"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="imageUrl">
                  <small>imageUrl</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.imageUrl}
                  name="imageUrl"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="price">
                  <small>Price</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.price}
                  name="price"
                  type="number"
                  step=".01"
                />
              </div>
              <div>
                <label htmlFor="description">
                  <small>Description</small>
                </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.description}
                  name="description"
                  type="text"
                />
              </div>

        </form>
        </div>
        {/* :
        <div></div>
        } */}

        </div>
       
    )

}
}

const mapState = function(state, ownProps){
    return {
        singleProduct: state.products.find(product => product.id === +ownProps.match.params.id),
        currentUser: state.currentUser
    }
}

const mapDispatch = function(dispatch, ownProps) {
    return {
        handleSubmit(evt) {
            evt.preventDefault();
            const newId = ownProps.match.params.id;
            console.log(ownProps.match.params.id);
            const orderLine = {
                [newId]: +evt.target.quantity.value
            }
            dispatch(updateCartThunk(orderLine))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

