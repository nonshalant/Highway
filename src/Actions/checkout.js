import axios from "axios"
import { COMPLETE_PURCHASE, DELIVERY_INSTRUCTIONS } from "./types"

export const createPaymentIntentAction = (customerDetails) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/create-payment-intent', {customerDetails})
        dispatch({type: COMPLETE_PURCHASE, payload: response.data})
    } catch (error) {
        console.error(error)
    }
}

export const handlePaymentSuccess = () => async dispatch => {
    try {
        await axios.post('http://localhost:5000/payment-success', {})
    } catch (error) {
        console.error(error);
    }
} 

export const saveDeliveryInstructions = (deliveyInstructions) => async dispatch => {
    try {
        console.log(deliveyInstructions)
       dispatch({type: DELIVERY_INSTRUCTIONS, payload: deliveyInstructions})
    } catch (error) {
        console.error(error);
    }
}