import React from 'react'
import Navigation from '../Navigation/Navigation'
import { Navigate } from 'react-router-dom'

const Notification = () => {
  if(!localStorage.token){
    return <Navigate to='/'/>
  }

  return (
    <div>
      {localStorage.token && <Navigation />}
    </div>
  )
}

export default Notification