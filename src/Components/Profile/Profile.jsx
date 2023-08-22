import React, { useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import { Navigate } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import RenderProfileOptions from './RenderProfileOptions'
import Footer from '../Footer/Footer'

const Profile = () => {
  const [optionSelected, setOptionSelected] = useState()

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  if(!localStorage.token){
    return <Navigate to='/'/>
  };

  return (
    <div>
      {localStorage.token && <Navigation />}
      <div className="profile">
        <ProfileMenu setOptionSelected={setOptionSelected} />
        <RenderProfileOptions optionSelected={optionSelected} />
      </div>
      <Footer />
    </div>
  )
}

export default Profile