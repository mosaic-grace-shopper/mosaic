import React from 'react';

export default function ProductItem( { theProduct } ) {

  return (
    <div className="productItem">
      <h3><b>{theProduct.title}</b> by {theProduct.artist}</h3>
      <h5>${theProduct.price} - <i>{theProduct.quantity} available</i></h5>
      <img src={theProduct.imgUrl} />
    </div>
  )
}

