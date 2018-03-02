import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { updateCartThunk } from '../store/cart';


// probably needs to be a stateful component?
function SingleProduct( props ){
    const product = props.singleProduct


    // function handleSubmit(evt) {
    //     evt.preventDefault();
    //     console.log('Form submit clicked');
    //     console.log('Ordering ', evt.target.quantity.value, ' of', product.title, ' id no:', product.id);
    //     // check to see if there is a cart on the state?
    //     // send put with props.id to /api/cart

    // }

    if (!product) return <div />
    return (
        <div>
        <h2> Artist: {product.artist}</h2>
            <h1>{product.title}</h1>
            <img src={product.imgUrl} />
            <h4>{product.description}</h4>
            <h4>${product.price}</h4>
            <h4><em>{product.quantity} available</em></h4>
            <form onSubmit={props.handleSubmit}>
                <input type="number" name="quantity" step="1" defaultValue="1" min="1" max={product.quantity} />
                <button>Buy this Item</button>
            </form>
            <button><Link to="/products">Back to Products</Link></button>
        </div>
    )
}

const mapState = function(state, ownProps){
    return {
        singleProduct: state.products.find(product => product.id === +ownProps.match.params.id)
    }
}

const mapDispatch = function(dispatch, ownProps) {
    return {
        handleSubmit(evt) {
            evt.preventDefault();
            const newId = ownProps.match.params.id;
            const orderLine = {
                newId: +evt.target.quantity.value
            }
            dispatch(updateCartThunk(orderLine))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

