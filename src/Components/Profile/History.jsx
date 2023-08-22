import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.token){
      navigate('/');
    }
  },[navigate]);

  return (
    <div className='history'>
      <div className="history-container">
        <h1>You have no order history.. Complete an order and come back!</h1>
      </div>
    </div>
  )
}

export default History