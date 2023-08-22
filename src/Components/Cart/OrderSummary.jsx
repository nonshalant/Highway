import React from 'react'
import { Link } from 'react-router-dom';

const OrderSummary = ({createOrderReview, subTotal}) => {
  return (
    <div className="summary-outer">
    {
      <div className="cart-summary">
        <div className="cart-summary-container">
          <div className="summary-top">
            <p>Subtotal: ${subTotal}</p>
            <p>Est Tax: calculated at checkout </p>
            <p>Delivery Fee: calculated at checkout</p>
          </div>
          <div className="summary-bottom">
            <h2>Total: ${subTotal}</h2>
            <div className="buttons">
              {
                subTotal === 0 ? 
                 <button disabled className='button-disabled'>Review Order</button>
                  :
                  <Link to='/order-review'><button onClick={()=>createOrderReview()} className=''>Review Order</button></Link>
              }
              <Link to='/'><button className=''>Continue Ordering</button></Link>
            </div>
          </div>
        </div>
      </div>
    }
  </div>
  )
}

export default OrderSummary