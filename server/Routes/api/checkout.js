const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const DeliveryOrder = require("../../models/DeliveryOrder");
const Profile = require("../../models/Profile");

// add to env file
const stripe = require("stripe")
(process.env.REACT_APP_STRIPE_API_TEST_KEY); 

const calculateOrderAmount = (totalAmount) => {
  const total = totalAmount * 100;
  return total; 
};

router.post("/", async(req, res) => { 
  const { totalAmount, selectedTip, shipping, user } = req.body.customerDetails;

  // Calculate tip amount in cents
  const tipAmountInCents = selectedTip * 100;

  const customer = await stripe.customers.create({
    shipping: {  
      name: user.fullName,
      address: {  
        city: shipping,
        line1: shipping, 
        postal_code: shipping
      }
    },
    email: user.email,
    phone: user.userNumber,
    name: user.fullName 
  }); 
 
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(totalAmount), 
    currency: "usd",
    metadata: {
      tip_cents: tipAmountInCents.toString(), // Store tip amount in cents as metadata
    },
    automatic_payment_methods: {
      enabled: true,
    }, 
    customer: customer.id, 
  });

  res.send({ 
    clientSecret: paymentIntent.client_secret,
  });
}); 

router.post('/deliveryInstructions', auth, async(req, res) => {
  try {
    const { meetOption, instructions, address} = req.body
    const userId = req.user.id;
    const orders = DeliveryOrder.findOne({_id: userId});
  
    if(!orders){
      const deliveryOrders = new DeliveryOrder({
        deliveryInformation: {
          instructions,
          meetOption,
          address
        }
      })
    }else {
     
    }


  } catch (error) {
    
  }
  
})

module.exports = router;