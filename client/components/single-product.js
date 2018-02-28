// naming go camel case for the file -- KHEJ
import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

function SingleProduct(props){
    const product = props.singleProduct
    if (!product) return <div /> // write some sort of 'hi there is no product'
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

// either have getAllProducts in componentDidMount here or move up a level to the parent of both singleProduct and productList -- KHEJ

const mapState = function(state, ownProps){
    return {
        singleProduct: state.products.find(product => product.id === +ownProps.match.params.id)
    }
}

export default withRouter(connect(mapState, null)(SingleProduct))

