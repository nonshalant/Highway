import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {createPaymentIntentAction} from '../../Actions/checkout'
import { getCurrentProfile } from '../../Actions/profile'

const OrderReviewRight = ({formComplete}) => {
    const cartItems = useSelector(state => state.profile.orderReviewCart);
    const shipping = useSelector(state => state.profile.address);
    const user = useSelector(state => state.profile.user)
    const [subTotal, setSubTotal] = useState(0);
    const [selectedTip, setSelectedTip] = useState(0);
    const dispatch = useDispatch()

    const calculateTip = (e) => {
        const tipOption = e.target.innerText;
        if (tipOption === 'Other') {
            setSelectedTip('other');
        } else {
            switch (tipOption) {
                case '15%':
                    setSelectedTip(subTotal * 0.15);
                    break;
                case '18%':
                    setSelectedTip(subTotal * 0.18);
                    break;
                case '20%':
                    setSelectedTip(subTotal * 0.20);
                    break;
                case '25%':
                    setSelectedTip(subTotal * 0.25);
                    break;
                default:
                    setSelectedTip(0);
                    break;
            }
        }
    };    

    const createPaymentIntent = () => {  
        const totalAmount = subTotal + selectedTip;
        const customerDetails = {
            totalAmount,
            selectedTip,
            shipping: shipping.address,
            user
        }
        dispatch(createPaymentIntentAction(customerDetails))
    };

    useEffect(()=>{
        dispatch(getCurrentProfile())
    },[])

    useEffect(() => {
        if (cartItems && cartItems.cart) {
            const cartItemsPrice = cartItems.cart.map(items => items.amount * items.price);
            setSubTotal(cartItemsPrice.reduce((acc, currVal) => {
                return acc + currVal;
            }, 0));
        }
    }, [cartItems]);
    
  return (
    <div className="order-review-right">
        <div className="order-review-right-outer">
            <div className="order-review-payment-confirm">
                <div className="">
                    <Link to="/create-payment-intent"><button disabled={!formComplete} onClick={createPaymentIntent}>Continue To Payment</button></Link>
                </div>
                <p>By proceeding to payment, you have reviewed and agree to the Terms of Use and acknowledge the Privacy Notice. You are at least 18 years of age.</p>
            </div>
            <div className="order-review-fees">
                <div className="fees-inner">
                    <p>Subtotal</p>
                    <p>${subTotal}</p>
                </div>
                <div className="fees-inner">
                    <p>Delivery Fee</p>
                    <p>$2.50</p>
                </div>
                <div className="fees-inner">
                    <p>Service Fee</p>
                    <p>$2.50</p>
                </div>
            </div>
            <div className="order-review-final">
                <div className="tip-container">
                    <p>Add a tip</p>
                    {selectedTip !== 'other' ? (
                        <p>${selectedTip.toFixed(2)}</p>
                    ) : (
                        <p>$0.00</p>
                    )}
                </div>
                <div className="tip-container">
                    <p>Tips are based on your order total of ${subTotal} before any discounts or promotions. Learn how couriers receive tips.</p>
                </div>
                <div className="tip-container">
                    <p onClick={calculateTip}>15%</p>
                    <p onClick={calculateTip}>18%</p>
                    <p onClick={calculateTip}>20%</p>
                    <p onClick={calculateTip}>25%</p>
                    <p onClick={calculateTip}>Other</p>
                </div>
            </div>
            <div className="order-review-total">
                <p>Total</p>
                {subTotal !== undefined && (
                    <p>${subTotal + selectedTip}</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default OrderReviewRight