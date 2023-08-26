import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../images/[removal.ai]_68a84044-d6c8-4a74-9202-4b0f8c39674a-2.png'
import './navigation.css'
import {AiFillHome} from 'react-icons/ai'
import { FaUserAlt} from 'react-icons/fa'
import {ImCart, ImExit} from 'react-icons/im'
import { storeData } from '../../storeData';
import SearchBar from './SearchBar';
import { logout } from '../../Actions/auth';
import { useDispatch } from 'react-redux';

const Navigation = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='navigation'>
        <header>
            <nav className='nav_bar'>
                <div className="logo">
                  <img src={logo} alt='logo' className='niche_logo'/>
                </div>
                <ul className="nav_links">
                  <Link to='/home'><li><AiFillHome />Home</li></Link>
                </ul>
               <SearchBar storeData={storeData} />
                <div className='user_options'>
                  <Link to='/profile'><p><FaUserAlt/>Me</p></Link>
                  <Link to='/cart'><ImCart/>Cart</Link>
                  <a onClick={handleLogout} href='/'><ImExit />Logout</a>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navigation