import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import './map.css';

const Map = ({ deliveryAddress }) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY
  const { isLoaded } = useLoadScript({  
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places']
  });

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const [directionsResponse, setdirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setduration] = useState('')
  const originRef = useRef;
  const destinationRef = useRef;

  useEffect(() => {
    if (!isLoaded) return;

    const getCoordinates = async () => {
      try {
        const results = await getGeocode({ address: deliveryAddress });
  
        if (results.length > 0) {
          const { lat, lng } = await getLatLng(results[0]); 
          setLatitude(lat);
          setLongitude(lng);
        } else {
          console.log('No geocode results found.');
        }
        setLoading(false); // Update loading state
      } catch (error) {
        console.error(error); 
      }
    };

    getCoordinates();
  }, [isLoaded, deliveryAddress]); // Add dependencies

  if (!isLoaded || loading) { // Update condition
    return <>Loading...</>;
  }

  return (
    <div>
      <GoogleMap zoom={15} center={{ lat: latitude, lng: longitude }} mapContainerClassName="map-container">
        <Marker position={{ lat: latitude, lng: longitude }}/>
      </GoogleMap>
    </div>
  );
};

export default Map;