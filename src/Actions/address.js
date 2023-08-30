import axios from "axios"
import {ADD_ADDRESS, RETREIVE_ADDRESS} from './types'

// get users address 
export const getUserAddress = () => async dispatch => 
{
    try {
        const response = await axios.get('https://highway-client-server.onrender.com:10000/address')    
        dispatch({type: RETREIVE_ADDRESS, payload: response.data})
    } catch (error) {
        console.error(error)
    }
}

// create or update users address 
export const saveAddressData = (data) => async dispatch => 
{
    try {
        const response = await axios.post('https://highway-client-server.onrender.com:10000/address', {data});
        dispatch({type: ADD_ADDRESS, payload: response.data.updateProfile})
    } catch (error) {
        console.error(error)
    }
}