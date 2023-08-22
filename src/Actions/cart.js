import axios from "axios";
import { ADD_TO_CART, DECREMENT_CART, INCREMENT_CART, RETRIEVE_CART, REVIEW_ORDER_ITEMS } from "./types";

// increment the quantity of cart item 
export const handleIncrement = (event, increment) => async dispatch => {
  const response = await axios.patch(`http://localhost:5000/cart/update/${increment.productName}`, {event}, {withCredentials: true});
  dispatch({type: INCREMENT_CART, payload: response.data})
};

// decrement the quantity of cart item 
export const handleDecrement = (event, decrement) => async dispatch => {
  const response = await axios.patch(`http://localhost:5000/cart/update/${decrement.productName}`, {event}, {withCredentials: true});
  // const updatedCart = response.data.filter(item => item.amount > 0);
  dispatch({type: DECREMENT_CART, payload: response.data});
};

// add item to customers cart
export const addToCart = (product) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/cart', { product }, {withCredentials: true});
    dispatch({ type: ADD_TO_CART, payload: response.data });
  } catch (error) {
    console.error('Error adding to cart:', error); 
  }
};

// retreive customers cart
export const retrieveCart = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5000/cart', { withCredentials: true });
    dispatch({ type: RETRIEVE_CART, payload: response.data });
  } catch (error) {
    console.error('Could not retrieve cart:', error);
  }
};

// removes an item from the cart 
export const removeItem = (productName) => async dispatch => {
  try {
    await axios.patch(`http://localhost:5000/cart/remove/${productName}`)
  } catch (error) {
    console.error(error);
  }
} 

// selected items being sent for order review 
export const sendToOrderReview = (itemsSelected) => async dispatch => { 
  try {
    await axios.post('http://localhost:5000/cart/order-review', {itemsSelected})
  } catch (error) {
    console.error(error)
  }
}

export const getOrderReview = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5000/cart/order-review', { withCredentials: true })
    dispatch({type: REVIEW_ORDER_ITEMS, payload: response.data})
  } catch (error) {
    console.error(error);
  }
}