import React, { useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import OrderReviewLeft from './OrderReviewRight'
import OrderReviewRight from './OrderReviewLeft'
import './orderReview.css'
import { useNavigate } from 'react-router-dom'

const OrderReview = () => {
  const navigate = useNavigate();

  useEffect(()=>{
      if(!localStorage.token){
        navigate('/');
      }
    },[navigate]);

  return (
    <div className='blur-effect'>
        {localStorage.token && <Navigation />}
        <div className='order-review'>
            <OrderReviewLeft />
            <OrderReviewRight />
        </div>
    </div>
  )
}

export default OrderReview