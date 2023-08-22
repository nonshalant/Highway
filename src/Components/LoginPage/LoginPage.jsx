import React from "react";
import LandingPage from "./LandingPage";
import { Navigate } from 'react-router-dom'

export const LoginPage = ({isAuthenticated}) => {
    // redirect if logged in
    if(isAuthenticated){
        return <Navigate to='/home' />
    }

  return (
    <div className='login'>
        <LandingPage />
    </div>
  )
}
