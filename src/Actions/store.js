import axios from "axios"
import { PRODUCT_ID } from "./types"

// renders the store inventory 
export const renderStoreInventory = (productId) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_ID, payload: productId})
  } catch (error) {
   
  }
}