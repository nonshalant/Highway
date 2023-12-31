import axios from "axios"
import { FETCH_FAVORITE_STORES } from "./types";

export const toggleFavorite = (toggle, storeDetails) => async dispatch => {
  try {
    if(toggle === true) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
  
      await axios.post('https://highway-client-server.onrender.com:10000/favorite', { storeDetails }, config);

    }else { 
      const {storeName} = storeDetails;
      await axios.delete(`https://highway-client-server.onrender.com:10000/favorite/${storeName}`)
    }

  } catch (error) {
    console.error(error)
  }
};

export const fetchFavoriteStores = () => async dispatch => {
  try {
    const response = await axios.get('https://highway-client-server.onrender.com:10000/favorite');
    dispatch({type: FETCH_FAVORITE_STORES, payload: response.data}); 
  } catch (error) {
    console.error(error) 
  }
}