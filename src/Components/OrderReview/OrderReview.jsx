import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import OrderReviewLeft from './OrderReviewRight';
import OrderReviewRight from './OrderReviewLeft';
import { useNavigate } from 'react-router-dom';
import './orderReview.css';

const OrderReview = () => {
  const navigate = useNavigate();
  const [formComplete, setFormComplete] = useState();

  useEffect(()=>{
      if(!localStorage.token){
        navigate('/');
      }
    },[navigate]);

  return (
    <div className='blur-effect'>
        {localStorage.token && <Navigation />}
        <div className='order-review'>
            <OrderReviewLeft formComplete={formComplete} />
            <OrderReviewRight setFormComplete={setFormComplete}/>
        </div>
    </div>
  )
}

export default OrderReview