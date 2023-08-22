import React, { useEffect, useState } from 'react'
import { getCurrentProfile } from '../../Actions/profile'
import { useDispatch, useSelector } from 'react-redux'

const User = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.profile.user);
  const [editOption, setEditOption] = useState('');
  let renderEditComponent;

  const handleUpdate = (e) => {
    setEditOption(e.target.innerText);
  };
  
  useEffect(()=>{
    dispatch(getCurrentProfile())
  },[])

  if(!user){
    return <p>Loading</p>
  }

  return (
    <div className='user'>
      <h1>Your Profile</h1>
      <div className="profile-details">
        <div className="profile-details-container">
          <h2>Name</h2>
          <p>{user.fullName}</p>
        </div>
        <p onClick={(e)=>handleUpdate(e)}></p>
      </div>
      <div className="profile-details">
        <div className="profile-details-container">
          <h2>Username</h2>
          <p>{user.userName}</p>
        </div>
        <p onClick={handleUpdate}></p>
      </div>
      <div className="profile-details">
        <div className="profile-details-container">
          <h2>Email</h2>
          <p>{user.email}</p>
        </div>
        <p onClick={handleUpdate}>edit</p>
      </div>
      <div className="profile-details">
        <div className="profile-details-container">
          <h2>Number</h2>
          <p>{user.userNumber}</p>
        </div>
        <p onClick={handleUpdate}>edit</p>
      </div>
      {
        renderEditComponent
      }
    </div>
  )
}

export default User