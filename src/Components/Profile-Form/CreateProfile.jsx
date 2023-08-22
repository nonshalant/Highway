import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createAProfile} from '../../Actions/profile'
import Navigation from '../Navigation/Navigation'

const CreateProfile = ({createAProfile}) => {
  const [formData, setFormData] = useState({
     
  })

  const {} = formData;

  const onChange = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    createAProfile(formData)
  }

  return (
    <div>
      <Navigation />
        <h1 className='profile_setup'>Profile Setup</h1>
        <form className="form" onSubmit={(e)=>handleSubmit(e)}>
          <div className="form_container">
            
        </div>
      </form>
    </div>
  )
}

CreateProfile.propTypes = {
  createAProfile: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
  
});

export default connect(null, {createAProfile})(CreateProfile)



