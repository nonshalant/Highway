import React, { useEffect, useState } from 'react'
import {FaLocationArrow} from 'react-icons/fa'
import {BsFillPersonFill} from 'react-icons/bs'
import {TbTruckDelivery} from 'react-icons/tb'
import EditForm from './EditForm'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderReview } from '../../Actions/cart'
import { getUserAddress } from '../../Actions/address'

const OrderReviewLeft = () => {
    const dispatch = useDispatch()
    const [renderEditForm, setRenderEditForm] = useState(false)
    const [deliveryInstructions, setDeliveryInstructions] = useState({})
    const userAddress = useSelector(state => state.profile.address)
    const cartItems = useSelector(state => state.profile.orderReviewCart)

    const handleEditAddress = () => {
        setRenderEditForm(true);
    };

    useEffect(()=>{
        dispatch(getUserAddress())
        dispatch(getOrderReview())
    },[]);

  return (
    <div className="order-review-left">
        {
            userAddress && 
            <div className="order-review-left-outer">
                <div className="order-review-title">
                    <h1>{userAddress.cartItems && userAddress.cartItems.length > 0 ? userAddress.cartItems[0].storeName : 'No cart items'}</h1>
                </div>
                <div className="order-review-container">
                    <div className="order-review-inner">
                        <FaLocationArrow size={20}/>
                    </div>
                    <div className="order-review-inner">
                        {
                            !userAddress.address.streetAddress ?
                            <>
                               <>Where do you want to ship this to?</> 
                            </>
                            :
                            <>
                                <p>{userAddress.address.streetAddress}</p>
                                <p>{userAddress.address.streetAddress} {userAddress.address.city} {userAddress.address.zip}</p>
                            </>
                        }
                    </div>
                    <div className="order-review-inner">
                        <button onClick={handleEditAddress}>Edit</button>
                    </div>
                </div>
                {renderEditForm && <EditForm setDeliveryInstructions={setDeliveryInstructions} setRenderEditForm={setRenderEditForm} userAddress={userAddress}/>}
                <div className="order-review-container">
                    <div className="order-review-inner">
                        <BsFillPersonFill size={20}/>
                    </div>
                    <div className="order-review-inner flex">
                        <p>{deliveryInstructions.meetOption ? deliveryInstructions.meetOption : "Leave At Door"}</p>
                        <p>{deliveryInstructions.instructions ? deliveryInstructions.instructions : "(Apt Number, Company Name etc..)"}</p>
                    </div>
                    <div className="order-review-inner">
                        <button onClick={handleEditAddress}>Edit</button>
                    </div>
                </div>
                <div className="order-review-delivery">
                    <div>
                        <TbTruckDelivery size={25}/>
                    </div>
                    <h2>Estimated Delivery Time</h2>
                    <p>10-25 min</p>
                </div>
                <div className="order-review-cart">
                    <div className="review-cart-top">
                        <h2>Your Items</h2>
                        <div className="">
                            <button>Add Items</button>
                        </div>
                    </div>
                    <div className="review-cart-bottom">
                        {
                            cartItems ? cartItems.cart.map(item => 
                                <div key={item._id} className='review-cart-item'>
                                    <>
                                        <p>{item.amount}</p>
                                        <h2>{item.productName}</h2>
                                        <h2>{item.size}</h2>
                                   
                                        <div className="review-cart-price">
                                            ${item.price * item.amount}
                                        </div>
                                    </>
                                </div>
                                  
                            )
                            :
                            <div className=''>
                                <p>'loading'</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default OrderReviewLeft