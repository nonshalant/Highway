import React from 'react'
import { Link } from 'react-router-dom'

const ProductMapping = ({store, product, getProductId}) => {
  return (
    <div>
        <Link 
          onClick={()=>{getProductId(product)}}
          to={`/store/${store.storeName}/${product.productName}`} 
          className='product'>
          <img src={product.image} alt="" />
          <h3>{product.productName}</h3>
          <h3>${product.price}</h3>
        </Link>        
    </div>
  )
}

export default ProductMapping