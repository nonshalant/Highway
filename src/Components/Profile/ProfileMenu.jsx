import React from 'react'
import './profile.css'

const ProfileMenu = ({setOptionSelected}) => {

  const menuOptionSelected = (option) => {
    setOptionSelected(option.target.innerHTML)
  }
  
  return (
    <div className='profile-menu'>
      <h1>Your Account</h1>
        <ul className='profile-menu-container'>
          <li onClick={menuOptionSelected}>Profile</li>
          <li onClick={menuOptionSelected}>Address</li>
          <li onClick={menuOptionSelected}> History</li>
          <li onClick={menuOptionSelected}>For You</li>
          <li onClick={menuOptionSelected}>Favorites</li>
        </ul>
    </div>
  )
}

export default ProfileMenu