import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL, 
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT 
} from './types'
import setAuthToken from '../setAuthToken'


// load User
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    };

    try {
        const res = await axios.get('https://highway-client.onrender/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    };
}

//Register user
export const register = ({fullName, userName, email, userPassword, userNumber}) => async dispatch => {
    const body = JSON.stringify({fullName, userName, email, userPassword, userNumber});
    
    try{
        const res = await axios({ 
            method: 'post',
            url: 'https://highway-client.onrender/user/signup',
            data: body,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    }catch(error){
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

    //Login user
export const loginAuth = (email, userPassword) => async dispatch => {
    try{
        const body = JSON.stringify({email, userPassword});
        const res = await axios({ 
            method: 'post',
            url: 'https://highway-client.onrender/auth',
            data: body,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    }catch(error){
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({type: LOGIN_FAIL})
    }
};

export const logout = () => dispatch =>{
    dispatch({type: LOGOUT})
}
