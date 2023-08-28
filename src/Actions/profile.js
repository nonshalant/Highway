import axios from "axios";
import { PROFILE_ERROR, GET_PROFILE  } from "./types";

// get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const response = await axios.get('https://highway-client.onrender/profile/me')
        dispatch({  
            type: GET_PROFILE,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}; 

// create or update a profile 
export const createAProfile = (formData) =>async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post('https://highway-client.onrender/profile', formData, config)

        dispatch({ 
            type: GET_PROFILE,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });   
        
    }
}

