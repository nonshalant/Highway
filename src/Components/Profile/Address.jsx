import React, { useState, useEffect } from 'react';
import { saveAddressData, getUserAddress } from '../../Actions/address';
import { useDispatch, useSelector } from 'react-redux';

const Address = () => {
  const [addressData, setAddressData] = useState({
    clientStreet: '',
    clientAsf: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
  });

  const { clientStreet, clientAsf, clientCity, clientState, clientZip } = addressData;
  const [renderAddressForm, setRenderAddressForm] = useState(true);
  const [address, setAddress] = useState();
  const isLoading = useSelector(state => state.profile.loading);
  const addressFromReduxState = useSelector(state => state.profile.address);
  const dispatch = useDispatch();

  const handleRenderAddressForm = () => {
    setRenderAddressForm(!renderAddressForm);
  };

  const handleChange = (e) => {
    const copyAddressData = { ...addressData };
    copyAddressData[e.target.id] = e.target.value;
    setAddressData(copyAddressData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRenderAddressForm(!renderAddressForm)
    dispatch(saveAddressData(addressData))
  };  

  useEffect(() => {
    if (addressFromReduxState) {
      setAddress(addressFromReduxState);
    }
    dispatch(getUserAddress());
  }, [addressFromReduxState]);

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
                  <p>{address.address.streetAddress} {address.address.city} {address.address.zip}</p>
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
            <div className="input-container">
              <label htmlFor="street">Street Address</label>
              <input
                onChange={handleChange}
                value={clientStreet}
                type="text"
                name="street"
                id="clientStreet"
                placeholder='e.g 999 East Rd'
                required
              />
              </div>
              <div className="input-container">
                <label htmlFor="asf">Apt, Suite, Floor</label>
                <input
                  onChange={handleChange}
                  value={clientAsf}
                  type="text"
                  name="asf"
                  id="clientAsf"
                  placeholder='e.g 20B F2'
                />
              </div>
              <div className="input-container">
                <>
                  <label htmlFor="city">City</label>
                  <input
                    onChange={handleChange}
                    value={clientCity}
                    type="text"
                    name="city"
                    id="clientCity"
                    placeholder='e.g New York'
                    required
                  />
                </>
                <>
                  <label htmlFor="state">State</label>
                  <input
                    onChange={handleChange}
                    value={clientState}
                    type="text"
                    name="state"
                    id="clientState"
                    placeholder='New York'
                    required
                  />
                </>
              </div>
              <div className="input-container">
                <label htmlFor="zip">Zip</label>
                <input
                  onChange={handleChange}
                  value={clientZip}
                  type="text"
                  name="zip"
                  id="clientZip"
                  placeholder='11211'
                  required
                />
              </div>
            <input className='address-submit' type="submit" value="Submit" />
          </form>
        </div>
      }
    </div>
  );
};

export default Address;
