import React, { useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import './homepage.css'
import BrowseTitles from './BrowseTitles'

export const HomeLandingPage = () => {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  
  return (
    <div>
      {localStorage.token && <Navigation /> }
      <div className="home-main-container">
        <div className="home-heading">
          <div className='home-heading-inner'>
            <h1>W e l c o m e - T o - <span> O n  - T h e - G r o w!</span></h1>
          </div>
        </div>
        <div className="home-banner">
          <img src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg' alt="" />
        </div>
        <BrowseTitles />
      </div>
    </div>
  )
}

export default HomeLandingPage