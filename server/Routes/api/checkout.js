const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51MIzYED8fYLB50BOmp38wFzqPNOR8IXI1jMV5PkNOwVWRmhCMQIi6npi0n4mAKmFunjRu5i8iZlkVwS0OdtiDuax0057bWdFNC");

const calculateOrderAmount = (totalAmount) => {
  const total = totalAmount * 100;
  return total; 
};

router.post("/", async (req, res) => { 
  const { totalAmount, selectedTip, shipping, user } = req.body.customerDetails;

  // Calculate tip amount in cents
  const tipAmountInCents = selectedTip * 100;

  const customer = await stripe.customers.create({
    shipping: {  
      name: user.fullName,
      address: {  
        city: shipping.address.city,
        line1: shipping.address.streetAddress, 
        postal_code: shipping.address.zip
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

module.exports = router;
