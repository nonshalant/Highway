import React from 'react'
import HomeLandingPage from './HomeLandingPage'
import { Navigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

export const Home = () => {
  
  if(!localStorage.token){
    return <Navigate to='/' />
  }

  return (
    <div className='home-container'>
      {
        localStorage.token && 
        <>
          <HomeLandingPage />
          <Footer />
        </>
      }
    </div>
  )
}