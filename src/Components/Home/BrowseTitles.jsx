import React from 'react'
import { Link } from 'react-router-dom';
import { storeData } from '../../storeData';

const BrowseTitles = props => {
  return (
    <div className='browse-main-container'>
      <h1>Category</h1>
      <div className="browse-container">
        <div className='browse-title'>
          {
            storeData.map(store => 
              <Link to={`/store/${store.storeName}`} key={store.id} className="shop">
                <img src={store.image} alt="" />
                <div className="shop-details">
                  <h3>{store.storeName}</h3>
                  <h3>20-30 mins</h3>
                  <h3>Delivery Fee: $2.49</h3>
                </div>
              </Link>            
            )
          }
        </div>
      </div>
    </div>
  )
}

BrowseTitles.propTypes = {}

export default BrowseTitles