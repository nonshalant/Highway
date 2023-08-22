import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteStores } from '../../Actions/favorite';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteStores = useSelector(state => state.profile.favoriteStores)

  useEffect(()=>{
    dispatch(fetchFavoriteStores());
  },[]);

  return (
    <div className='favorites'>
      
      {
        favoriteStores === undefined ? (
          'Loading...' 
        ) : favoriteStores.length === 0 ? (
          'no favorites'
        ) : 
         favoriteStores.map(store => 
          <div key={store.storeId} className="favorites-container">
            <div className="favorites-details">
              <img src={store.storeImage} alt="IMAGE" />
            </div>
            <div className="favorites-details">
              <h1>{store.storeName}</h1>
              <h2>{store.storeLocation}</h2>
            </div>
            <div className="favorites-details">
              <Link to={`/store/${store.storeName}`}><button>Order</button></Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Favorites