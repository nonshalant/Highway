import axios from "axios"
import { COMPLETE_PURCHASE } from "./types"

export const createPaymentIntentAction = (customerDetails) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/create-payment-intent', {customerDetails})
        dispatch({type: COMPLETE_PURCHASE, payload: response.data})
    } catch (error) {
        console.error(error)
    }
}