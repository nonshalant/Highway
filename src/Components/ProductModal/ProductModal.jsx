import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import './productModal.css'
import { addToCart } from '../../Actions/cart';
import { storeData } from '../../storeData';
import Footer from '../Footer/Footer'

const ProductModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {storeName, productName } = useParams();
    const [playAnimation, setPlayAnimation] = useState(false)
    const cartItems = useSelector(state => state.profile)
    const data = storeData.filter(name => name.storeName === storeName);
    const res = data[0].inventory.filter(x => x.productName === productName); 

    const handleClick = () => {
        handlePlayAnimation()
        dispatch(addToCart(res[0]))
        res[0].amount++
    }

    const handlePlayAnimation = () => {
        setPlayAnimation(true)
        setTimeout(()=>{
            setPlayAnimation(false)
        },[4000])
    }
      
    useEffect(()=>{
        if(!localStorage.token){
            navigate('/')
        }
        window.scrollTo(0,0);
    },[navigate]);

  return (
    <div className='product-modal'>
        {localStorage.token && <Navigation />}

        {
            playAnimation && cartItems && cartItems.cart &&
            <div className="cart-animation">
               <div className="cart-animation-container">
                {
                    cartItems.cart.map(item => 
                        <div key={item.productName} className='cart-animation-items'>
                            <div className="image">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="details">
                                <div className="">
                                    {item.productName}
                                </div>
                                <div className="">
                                    x{item.amount}
                                </div>
                            </div>
                        </div>
                    )
                }
                <Link to='/cart'><button>View Cart</button></Link>
               </div>
            </div>   
        }

        <div className="product-modal-redirect">
           <Link to={`/store/${storeName}`}>Back</Link>
        </div>
        <div className="product-modal-container">
            <div className="product-modal-left">
                <img src={res[0].image} alt="" />
            </div>
            <div className="product-modal-right">
                <p>{res[0].productType}</p>
                <h1>{res[0].productName}</h1>
                <div className="product-modal-price">
                    <h1>${res[0].price}</h1>
                    <p>{res[0].size}</p>
                </div>
                <button onClick={handleClick}>Add To Cart</button>
                <h2>About This Product</h2>
                {res[0].description}
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default ProductModal