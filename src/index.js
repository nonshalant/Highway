import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// Move the Google Maps Places API script tag here
const googleMapsScript = document.createElement('script');
googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
googleMapsScript.async = true;
googleMapsScript.defer = true;
document.body.appendChild(googleMapsScript);
