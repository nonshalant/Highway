import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import './map.css'
import { Combobox, ComboboxPopover, ComboboxInput, ComboboxList, ComboboxOption } from '@reach/combobox';

const Map = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyBK4YJb0SdVHgXnx0xy5wZatXAwlrLqzbQ',
        libraries: ['places'] 
    })

    if(!isLoaded) {
        return<>Loading...</>
    }
  return (
    <div>
        <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container"></GoogleMap>
    </div>
  )
}

export default Map