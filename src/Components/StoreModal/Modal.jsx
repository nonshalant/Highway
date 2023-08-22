import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import { useDispatch, useSelector } from 'react-redux';
import ProductMapping from './ProductMapping';
import './modal.css'
import { renderStoreInventory } from '../../Actions/store';
import { storeData } from '../../storeData';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { fetchFavoriteStores, toggleFavorite } from '../../Actions/favorite';

const Modal = () => {
    const {storeName} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false); 
    const [storeDetails, setStoreDetails] = useState({})
    const [filterSelected, setFilterSelected] = useState([])
    const favoriteStores = useSelector(state => state.profile.favoriteStores)

    const getProductId = (product) => {
        dispatch(renderStoreInventory(product))
    };

    const addToFavorite = (storeName, storeImage, storeLocation, storeId) => {
        setStoreDetails({storeName, storeImage, storeLocation, storeId });
        setToggle(true);
    };
    
    const removeFavorite = (storeName) => {
        setStoreDetails({ storeName });
        setToggle(!toggle);
    };

    const handleFilterSelected = (e) => {
        setFilterSelected(e.target.innerText)

        if(e.target.innerText === 'Clear Filters'){
            setFilterSelected([])
        }
    }
    
    useEffect(() => {
        dispatch(toggleFavorite(toggle, storeDetails));
    }, [toggle, dispatch]);

    useEffect(()=>{
        dispatch(fetchFavoriteStores())

        if(favoriteStores && favoriteStores.length > 0){
            setToggle(true)
        }else{
            setToggle(false)
        }
    },[])

    useEffect(()=>{
        if(!localStorage.token){
            navigate('/')
        };
        window.scrollTo(0,0);
    },[navigate]);

  return (
    <div>
        {localStorage.token && <Navigation />}
 
        <div className="modal">
            <div className="modal-container">
                {
                    storeData.map(store => store.storeName === storeName &&
                        <div key={store.id}>
                            <div className="img-container">
                                <img src={store.image} alt="" />
                            </div>
                            <div className='store-info'>
                                <div className='store-info-top'>
                                    <div className='store-info-flex'>
                                        <div className="inner">
                                            <div className="store-name">
                                                <>
                                                    <h1>{store.storeName} - {store.location}</h1>
                                                </>
                                                <>
                                                    <h2>{store.reviews.customerRating} </h2>
                                                    <h2>Read some reviews </h2>
                                                </>
                                            </div>
                                            {
                                                !toggle ? 
                                                <AiOutlineHeart 
                                                    onClick={()=>addToFavorite(store.storeName, store.image, store.location, store.id)} 
                                                    size={40} 
                                                /> 
                                                : <AiFillHeart 
                                                    onClick={()=>removeFavorite(store.storeName)} 
                                                    size={40}
                                                />
                                            }                               
                                        </div>
                                    </div>
                                </div>
                                <div className='store-bottom-container'>
                                    <div className="store-categories">
                                        <ul className='store-categories'>
                                            <h1></h1>
                                            <div className="category-section">
                                                <li onClick={handleFilterSelected}>Most Popular</li>
                                                <li onClick={handleFilterSelected}>High-Low</li>
                                                <li onClick={handleFilterSelected}>Newest</li>
                                                <li onClick={handleFilterSelected}>A-Z</li>
                                            </div>
                                            <div className="category-section">
                                                <li onClick={handleFilterSelected}>Flower/Buds</li>
                                                <li onClick={handleFilterSelected}>Pre-Rolls</li>
                                                <li onClick={handleFilterSelected}>Edibles</li>
                                                <li onClick={handleFilterSelected}>Carts/Pens</li>
                                                <li onClick={handleFilterSelected}>Vape</li>
                                                <li onClick={handleFilterSelected}>Topicals</li>
                                                <li onClick={handleFilterSelected}>CBD Products</li>
                                                <li onClick={handleFilterSelected}>Accessories</li>
                                            </div>
                                            <div className="category-section">
                                                <li onClick={handleFilterSelected}>Clear Filters</li>
                                            </div>
                                        </ul>
                                    </div>
                                    <div className="store-products">
                                        {
                                            filterSelected.length === 0 ?
                                            store.inventory.map(product => 
                                                <ProductMapping    
                                                    store={store} 
                                                    key={product.id}
                                                    getProductId={getProductId} 
                                                    product={product} 
                                                />
                                            ):
                                            store.inventory.filter(product => product.category === filterSelected).map(product => 
                                                <ProductMapping    
                                                    store={store} 
                                                    key={product.id}
                                                    getProductId={getProductId} 
                                                    product={product} 
                                                />
                                            )
                                        }             
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div> 
        {/* <Footer />      */}
    </div>
  )
}

export default Modal