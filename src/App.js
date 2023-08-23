import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { LoginPage } from './Components/LoginPage/LoginPage';
import SignUp from './Components/Signup/SignUp';
import Alert from './Components/Layout/Alert';
import { Home } from './Components/Home/Home';
import Message from './Components/Messages/Message';
import Profile from './Components/Profile/Profile';
import CreateProfile from './Components/Profile-Form/CreateProfile';
import Modal from './Components/StoreModal/Modal';
import { useSelector} from 'react-redux'
import { loadUser } from './Actions/auth';
import setAuthToken from './setAuthToken';
import ProductModal from './Components/ProductModal/ProductModal';
import Cart from './Components/Cart/Cart';
import PaymentForm from './Components/Checkout/CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderReview from './Components/OrderReview/OrderReview';
import store from './store';
import PaymentSuccess from './Components/Checkout/PaymentSuccess';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  const [clientSecret, setClientSecret] = useState("");
  const clientSecretFromRedux = useSelector(state => state.profile.clientSecret)

  useEffect(() => {
    store.dispatch(loadUser());
    if (clientSecretFromRedux) {
      setClientSecret(clientSecretFromRedux.clientSecret);
    }
  }, [clientSecretFromRedux]);
  
  const stripePromise = loadStripe("pk_test_51MIzYED8fYLB50BOZELzSLWJgl9FBddpEOQNrCDJmavVB4504mpVPulnRj2R0Pe6qqU41DQ10jIjuVGu5vu1Ct0o00MOLHkOuy");

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <div className='app'>
        <Alert />
        <Routes>
          <Route path='/' element={<LoginPage />}> </Route>
          <Route path='/create-payment-intent' element={clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          ) : null}> </Route>
          <Route path='/payment-success' element={<PaymentSuccess />}> </Route>
          <Route path='/signup' element={<SignUp />}> </Route>
          <Route path='/order-review' element={<OrderReview />}> </Route>
          <Route path='/home' element={<Home />}> </Route>
          <Route path='/messages' element={<Message/>}> </Route>
          <Route path='/store/:storeName' element={<Modal/>}> </Route>
          <Route path='/store/:storeName/:productName' element={<ProductModal/>}> </Route>
          <Route path='/cart' element={<Cart />}> </Route>
          <Route path='/profile' element={<Profile />}> </Route>
          <Route path='/create-profile' element={<CreateProfile/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
