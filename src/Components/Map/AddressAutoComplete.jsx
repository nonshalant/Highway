import React, { useState } from 'react';
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const AddressAutocomplete = ({ setAddressTest }) => {
  const [address, setAddress] = useState('');
  const {
    ready,
    value,
    suggestions: { data },
    setValue,
  } = usePlacesAutoComplete({
    debounce: 300,
  });

  const handleSelect = async (address) => {
    setAddress(address);
    setValue(address); // Set the address in the input field
    setAddressTest(address); // Pass the address to the parent component
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setAddress(e.target.value);
          setValue(e.target.value);
        }}
        placeholder="Enter your address"
      />
      <ul>
        {ready &&
          data.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion.description)}
            >
              {suggestion.description}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AddressAutocomplete;
