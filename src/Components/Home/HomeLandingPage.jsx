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
            <h1>W e l c o m e - T o - <span> H i g h  - W a y!</span></h1>
          </div>
        </div>
        <div className="home-banner">
   
        </div>
        <BrowseTitles />
      </div>
    </div>
  )
}

export default HomeLandingPage