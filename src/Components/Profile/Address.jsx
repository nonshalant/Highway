import React, { useState, useEffect } from 'react';
import { saveAddressData, getUserAddress } from '../../Actions/address';
import { useDispatch, useSelector } from 'react-redux';
import AddressAutocomplete from '../Map/AddressAutoComplete';

const Address = () => {
  const [renderAddressForm, setRenderAddressForm] = useState(true);
  const [addressTest, setAddressTest] = useState();
  const [address, setAddress] = useState('')
  const isLoading = useSelector(state => state.profile.loading);
  const addressFromReduxState = useSelector(state => state.profile.address);
  const dispatch = useDispatch();

  const handleRenderAddressForm = () => {
    setRenderAddressForm(!renderAddressForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRenderAddressForm(!renderAddressForm)
    dispatch(saveAddressData(addressTest))
  };  

  useEffect(()=>{
    dispatch(getUserAddress());
    setAddress(addressFromReduxState);
    
  },[addressFromReduxState])
 
  return (
    <div className='address'>
      <div className="add-new-address">
        <h1>Your saved address</h1>
        <div className="locations">
          {isLoading ? (
            <div>
              <p>No saved address</p>
            </div>
          ) : (
            <div>
              {address && address.address ? (
                <>
                  <p>{address.address}</p>
                </>
              ) : null}
            </div>
          )}
        </div>
        <button onClick={handleRenderAddressForm} className='button'>Add New Address</button>
      </div>
      {
        renderAddressForm === false && 
        <div className=''>
          <form className="address-form" onSubmit={handleSubmit}>
            <AddressAutocomplete setAddressTest={setAddressTest}/>
            <input className='address-submit' type="submit" value="Submit" />
          </form>
        </div>
      }
    </div>
  );
};

export default Address;
