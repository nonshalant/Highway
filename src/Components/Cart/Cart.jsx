import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveCart, sendToOrderReview } from '../../Actions/cart'
import CartItems from './CartItems'
import OrderSummary from './OrderSummary'
import './cart.css'

const Cart = () => {
  const customerCart = useSelector(state => state.profile.cart);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [subTotal, setSubTotal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemsToReview = (items) => {
    setItemsSelected(items)
  };

  const createOrderReview = () => {
    dispatch(sendToOrderReview(itemsSelected))
  };

  useEffect(()=>{
    const cartItemsPrice = itemsSelected.map(items => items.amount * items.price)
    setSubTotal(cartItemsPrice.reduce((acc, currVal) => {
      return acc + currVal
    }, 0));
  },[itemsSelected, customerCart]);
 
  useEffect(()=>{
    if(!localStorage.token){
      navigate('/');
    }else{
      window.scrollTo(0,0)
      dispatch(retrieveCart())
    }
  },[navigate]);

  return (
    <>
      {localStorage.token && <Navigation />}
      <div className='cart'>
        <div className="cart-quantity-container">
          <h1 className='cart-amount-details'>Items in cart: <span>{!customerCart ? 0 : customerCart.length}</span></h1>
          <h1 className='cart-amount-details'>Items checking out: <span>{!itemsSelected ? 0 : itemsSelected.length}</span></h1>
        </div>
        <div className="cart-container">
          <div className="cart-outer">
            {
              customerCart && customerCart.length < 1 ? 
                <div>
                  <Link to='/'><p>Your cart is empty<button> Go Shopping </button></p></Link>
                </div>
                : 
                <CartItems handleItemsToReview={handleItemsToReview} setItemsSelected={setItemsSelected}/>
            }
          </div>
          <OrderSummary createOrderReview={createOrderReview} subTotal={subTotal} />
        </div>
      </div>
    </>
  )
}

export default Cart