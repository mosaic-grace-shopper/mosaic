import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

function SingleProduct(props){
    const product = props.singleProduct
    if (!product) return <div />
    return (
        <div>
        <h2> Artist: {product.artist}</h2>
            <h1>{product.title}</h1>
            <img src={product.imgUrl} />
            <h4>{product.description}</h4>
            <h4>${product.price}</h4>
            <h4><em>{product.quantity} available</em></h4>
            <button><Link to="/products">Back to Products</Link></button>
        </div>
    )
}

const mapState = function(state, ownProps){
    return {
        singleProduct: state.products.find(product => product.id === +ownProps.match.params.id)
    }
}

export default withRouter(connect(mapState, null)(SingleProduct))

