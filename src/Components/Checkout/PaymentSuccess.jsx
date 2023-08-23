import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer'
import {BsFillCircleFill} from 'react-icons/bs'
import {RiCheckboxBlankCircleLine} from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { handlePaymentSuccess } from '../../Actions/checkout';

const PaymentSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
 
  useEffect(()=>{
    if(!localStorage.token){
      navigate('/');
    };
    dispatch(handlePaymentSuccess())
  },[navigate]);
  return (
    <>
      {localStorage.token && <Navigation /> }
      <div className='Payment-success'>
        <div className="success-container">
          <div className="delivery-info">
            <div className="delivery-info-container">
              <div className="delivery-store">
                <h1>Store Name</h1>
              </div>
              <div className="delivery-progress">
                <div className="progress-bar">
                  <RiCheckboxBlankCircleLine />
                  <p>Pending</p>
                </div>
                <div className="progress-bar">
                  <RiCheckboxBlankCircleLine />
                  <p>Order Accepted</p>
                </div>
                <div className="progress-bar">
                  <RiCheckboxBlankCircleLine />
                  <p>Waiting for pick up</p>
                </div>
                <div className="progress-bar">
                  <RiCheckboxBlankCircleLine />
                  <p>Out for delivery</p>
                </div>
                <div className="progress-bar">
                  <RiCheckboxBlankCircleLine />
                  <p>Arrived</p>
                </div>
              </div>
              <div className="eta">
                <p>Estimated Time Of Arrival:</p>
                <p>12:30PM</p>
              </div>
            </div>
          </div>
          <div className="map-container">
            <img className='map' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg" alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PaymentSuccess