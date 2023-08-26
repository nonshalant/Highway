import React, { useState } from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import { FaLocationArrow } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { saveDeliveryInstructions } from '../../Actions/checkout';

const EditForm = ({setRenderEditForm, setDeliveryInstructions, userAddress}) => {
    const dispatch = useDispatch();
    const [editFormInputs, setEditFormInputs] = useState({
        meetOption: 'Leave At Door',
        instructions: '',
        address: userAddress.address
    });

    const closeEditForm = () => {
        setRenderEditForm(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setDeliveryInstructions(editFormInputs)
        setRenderEditForm(false)
        dispatch(saveDeliveryInstructions(editFormInputs))
    };

    const handleSelect = (e) => {
        setEditFormInputs({...editFormInputs, meetOption: e.target.value})
    };

    const handleDeliveryInstructions = (e) => {
        setEditFormInputs({...editFormInputs, instructions: e.target.value})
    };
  return (
    <div className='edit-form'>
        <div className="close">
            <AiFillCloseCircle onClick={closeEditForm} size={20}/>
        </div>
        <div className="edit-form-details">
            <form className='edit-form-container' onSubmit={handleSubmit}>
                <h2><FaLocationArrow size={10}/> {userAddress.address}</h2>
                <h2>Delivery Details</h2>
                <select onChange={handleSelect} value={editFormInputs.meetOption} className="dropdown">
                    <option value="Leave At Door">Leave At Door</option>
                    <option value="Meet At Door">Meet At Door</option>
                    <option value="Meet Outside">Meet Outside</option>
                </select>
                <input placeholder='Add delivery instructions (Apt Number, Company Name etc..)' onChange={handleDeliveryInstructions} value={editFormInputs.instructions} type="text" name="" id="" />
                <button className='edit-form-button'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default EditForm 