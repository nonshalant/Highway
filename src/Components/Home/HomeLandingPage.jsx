import React, { useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import './homepage.css'
import BrowseTitles from './BrowseTitles'
import homeBanner from '../../images/Peach Modern Summer Big Sale Banner Landscape.png'

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
          <img src={homeBanner} alt="" />
        </div>
        <BrowseTitles />
      </div>
    </div>
  )
}

export default HomeLandingPage