import React from 'react'
import { Link } from 'react-router-dom'


const FooterBottom = () => {
  return (
    <div className='footer-bottom'>
        <div className="footer-bottom-container">
            <ul className='links'>
                <Link to='/'><li>Company logo</li></Link>
                <Link to='/'><li>Terms of Service</li></Link>
                <Link to='/'><li>Privacy</li></Link>
                <Link to='/'><li>Delivery Locations</li></Link>
                <Link to='/'><li>Features To Come</li></Link>
                <Link to='/'><li>Features To Come</li></Link>
                <Link to='/'><li>Instagram</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default FooterBottom