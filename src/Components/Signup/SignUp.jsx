import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './signup.css';
import {connect} from 'react-redux'
import { setAlert } from '../../Actions/alert';
import { register } from '../../Actions/auth';
import PropTypes from 'prop-types'

const SignUp =({setAlert, register, isAuthenticated})=> {
    const [data , setData] = useState({
        fullName : '',
        email: '',
        userName: '',
        userPassword: '',
        userPassword2: '',
        userNumber: '',
    })

    const {fullName, email, userName, userPassword, userPassword2, userNumber} = data;

    const handleChange = (e) =>{
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(userPassword !== userPassword2){
            setAlert('Passwords do not match', 'danger')
        }else{
            register({fullName, userName, email, userPassword, userNumber})
        }  
    }
    
    if(isAuthenticated){
        return <Navigate to='/' />
    }

  return (
    <div className='signup'>
        <div className="signup_container">
            <div className="signup_heading">
                <h1>OnTheGrow</h1>
                <p>Sign up to begin browsing local shops!</p>
            </div>
            <div className="user_signup-credentials">
                <form onSubmit={handleSubmit}>

                    <input required type="text" name="fullName" id="fullName" placeholder='Full Name' onChange={(e)=>handleChange(e)} value={fullName}/>

                    <input required type="email" name="email" id="email" placeholder='Email' onChange={(e)=>handleChange(e)} value={email}/>

                    <input required minLength='6' type="text" name="userName" id="userName" placeholder='Username' onChange={(e)=>handleChange(e)} value={userName}/>

                    <input required minLength='8' type="password" name="userPassword" id="userPassword" placeholder='Password' onChange={(e)=>handleChange(e)} value={userPassword}/>

                    <input required type="password" name="userPassword2" id="userPassword2" placeholder='Retype Password' onChange={(e)=>handleChange(e)} value={userPassword2}/>

                    <input required type="text" name="userNumber" id="userNumber" placeholder="Enter Your Number" onChange={(e)=>handleChange(e)} value={userNumber}/>

                    <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
        <div className="login_redirect">
            <Link to='/'> <p>Have an account already?</p></Link>
        </div>
    </div>
  )
}

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
}) 

export default connect(mapStateToProps, {setAlert, register})(SignUp)