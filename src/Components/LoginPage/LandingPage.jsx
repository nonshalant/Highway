import React, {useEffect, useState} from 'react'
import './loginpage.css'
import loginPageBook from '../../images/map.jpg'
import loginPageMagnifyingGlass from '../../images/shop.jpg'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAuth } from '../../Actions/auth'

export const LandingPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        userPassword: '',
    });
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const {email , userPassword} = loginData;

    const handleChange = (e) =>{
        const newLoginData = {...loginData}
        newLoginData[e.target.id] = e.target.value
        setLoginData(newLoginData);
    };

    // GET FORM TO WORK 

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginAuth(email, userPassword))
    }

    // redirect if logged in
    if(isAuthenticated){
        return <Navigate to='/home' />
    }

  return (
    <div className='loginPage'>
        <div className="loginPage_container">
            <div className="left_container">
                <img src={loginPageBook} alt="landigPage image" />
                <img className='loginPage_image-two' src={loginPageMagnifyingGlass} alt="landigPage image"/>
            </div>
            <div className="right_container">
                <div className="right_container-content">
                    <div className="user_login">
                        <h1>OnTheGrow</h1>
                        <div className='user_credentials'>
                            <form onSubmit={handleOnSubmit}>
                                <input autoComplete='username' type="text" name="email" id="email" placeholder='Email' onChange={(e)=>handleChange(e)} value={email}/>
                                <input autoComplete='current-password' type="password" name="userPassword" id="userPassword" placeholder='Password' onChange={(e)=>handleChange(e)} value={userPassword}/>
                                <button>Log in</button>
                            </form>
                        </div>
                    </div>
                    <div className="or_ladingPage">
                        <div className="empty_container"></div>
                        <p>OR</p>
                        <div className="empty_container"></div>
                    </div>
                    <div className="login_help-options">
                        <p>Log in with Facebook</p>
                        <a href="#"><p>Forgot Password?</p></a>
                    </div>
                    <div className="sign_up">
                        <Link to='/signup'><p>Dont have an account? <span>Sign Up</span></p></Link>
                    </div>
                </div>
            </div>
        </div>
        <footer className='footer'>
            <div className="footer_container">
                <ul className='footer_links'>
                    <a href=""><li>About</li></a>
                    <a href=""><li>Jobs</li></a>
                    <a href=""><li>Blog</li></a>
                    <a href=""><li>Help</li></a>
                    <a href=""><li>Niche</li></a>
                    <a href=""><li>Top Accounts</li></a>
                    <a href=""><li>&copy; 2022 Textbook</li></a>
                </ul>
            </div>
        </footer>
    </div>
  )
}

export default LandingPage;