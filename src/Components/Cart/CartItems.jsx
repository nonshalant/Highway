import React, { useState } from 'react'
import {BsFillTrashFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { handleDecrement, handleIncrement, removeItem } from '../../Actions/cart';

const CartItems = ({setItemsSelected, handleItemsToReview}) => {
    const customerCart = useSelector(state => state.profile.cart);
    const [productName, setProductName] = useState()
    const dispatch = useDispatch();

    const handleClick = (e, item) => {
      const event = e.target.innerText;
      if(event === "+"){
        const increment = {...item, amount: item.amount += 1}
        dispatch(handleIncrement(event, increment));
      }else {
        const decrement = {...item, amount: item.amount -= 1}
        dispatch(handleDecrement(event, decrement));
      };
    };

    const handleCheckboxChange = (e, cart) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        handleItemsToReview(prevItems => [...prevItems, cart]);
      } else {
        handleItemsToReview(prevItems =>
          prevItems.filter(item => item.productName !== cart.productName)
        );
      }
    }; 

    const handleTrashCan = (cart) => {
      if(cart){ 
        const productName = cart.productName;
        setProductName(productName)
        const targetItemIndex = customerCart.findIndex(
          item => item.productName === productName
        );
        customerCart.splice(targetItemIndex, 1);
        setItemsSelected(prevItem => 
            prevItem.filter(item => item.productName !== cart.productName)
          )
        dispatch(removeItem(productName));
      }else{
        console.log('No cart item received')
      }
    };

  return (
    <div className='cart-grid'>
      {
        customerCart && customerCart && customerCart.map( cart => 
          <div key={cart._id} className='cart-item'>
            <div className="cart-item-container">
              <div className="cart-image">
              <input type="checkbox" onClick={(e)=>handleCheckboxChange(e, cart)} name="selected-item" id="selected-item" />
                  <img src={cart.image} alt="" />
              </div>
              <div className="cart-details">
                <div className='cart-details-container'>
                  <h2>{cart.storeName}</h2>
                  <h1>{cart.productName}</h1>
                  <p>{cart.size}</p>
                  <p>{cart.productType}</p>
                  <p>${cart.price * cart.amount}</p>
                </div>
                <div className='amount-container'>
                  {cart.amount === 1 ? <span>   </span> : <span onClick={(e)=>handleClick(e, cart)}>-</span>}
                  <span>{ cart.amount }</span>
                  <span onClick={(e)=>handleClick(e, cart)}>+</span>
                </div>
                <BsFillTrashFill size={20} onClick={()=>handleTrashCan(cart)}/>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default CartItems