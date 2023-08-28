import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import {BsFillCircleFill} from 'react-icons/bs';
import {RiCheckboxBlankCircleLine} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { handlePaymentSuccess } from '../../Actions/checkout';
import Map from '../Map/Map';
import { getUserAddress } from '../../Actions/address';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8000');

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deliveryTo, setDeliveryTo] = useState('');
  const deliveryAddress = useSelector(state => state.profile.address);

  useEffect(()=>{
    if(!localStorage.token){
      navigate('/');
    };
    dispatch(handlePaymentSuccess())
    dispatch(getUserAddress())
  },[navigate]);

  useEffect(()=>{
    if(deliveryAddress && deliveryAddress.address){
      setDeliveryTo(deliveryAddress.address)
    };
  },[deliveryAddress])

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
                  <BsFillCircleFill />
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
            <Map deliveryAddress={deliveryTo}/>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PaymentSuccess