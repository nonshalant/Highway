# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


REFER - Create a FORYOU algo based on order history to rec products.
MESSAGE - Automated coupon messages
CART - Selective checkout 

Uber eats Restaurant portal - https://www.youtube.com/watch?v=DT4nO1Sp_xE

"Cultivating Bliss: On the Grow, to Your Doorstep"
"Growing Dreams, Delivering Bliss: On the Grow"
"On the Grow: Where Quality Sprouts and Delivers"
"On the Grow: Where Nature's Best Meets Your Door"
FIND AGE VALIDATION


# Highway

Algorithm after payment is processed

1. **Customer Places an Order:**
   The customer browses your platform, adds products to the cart, and proceeds to checkout. They provide their delivery details and complete the purchase.

2. **Order Created in the Database:**
   When the customer completes the checkout process, an order is created in your database. The order status is initially set to "Pending" or "Processing."

3. **Backend Updates Order Status:**
   After the order is created, your backend logic (API endpoint or service) updates the order status to "Processing" and triggers the Socket.IO event to notify clients about the order status update.

   ```javascript
   // Inside your API route or controller
   app.post('/create-order', (req, res) => {
     // Create the order in the database and set status to "Processing"
     const orderId = createOrder(req.body);

     // Emit an event to notify clients about the updated order status
     io.emit('order-status-updated', {
       orderId,
       newStatus: 'Processing',
     });

     res.json({ message: 'Order created' });
   });
   ```

4. **Client Receives Real-Time Update:**
   On the client side (customer's browser or mobile app), the Socket.IO connection is established, and the client is listening for the "order-status-updated" event. When the event is received, the client updates the UI to reflect the new order status.

   ```javascript
   import React, { useEffect, useState } from 'react';
   import io from 'socket.io-client';

   const OrderStatus = ({ orderId }) => {
     const [orderStatus, setOrderStatus] = useState('');

     useEffect(() => {
       const socket = io('http://localhost:3000'); // Replace with your server URL

       socket.on('order-status-updated', (data) => {
         if (data.orderId === orderId) {
           setOrderStatus(data.newStatus);
         }
       });

       return () => {
         socket.disconnect();
       };
     }, []);

     return (
       <div>
         <p>Order Status: {orderStatus}</p>
       </div>
     );
   };

   export default OrderStatus;
   ```

5. **Order Processing and Tracking:**
   As the order moves through different stages (e.g., packed, out for delivery), your backend logic updates the order status accordingly and emits Socket.IO events to notify clients about these changes. Clients connected to the Socket.IO server will receive these events and update the UI in real time.

6. **Delivery Updates and Notifications:**
   When the order is out for delivery, your delivery tracking system can use Socket.IO to provide real-time updates on the driver's location and estimated delivery time. Customers can track the progress of their order without manual refreshes.

7. **Order Delivered:**
   Once the order is successfully delivered, your backend logic updates the order status to "Delivered" and emits the corresponding Socket.IO event. Clients connected to the server receive the event and update their UI accordingly.

8. **Final Status Display:**
   The customer's UI displays the final order status as "Delivered," ensuring that they are kept informed in real time.

By integrating Socket.IO, you provide a seamless and real-time experience for your customers, enabling them to stay updated on their order status without having to manually refresh the page. The use of real-time communication enhances customer satisfaction and engagement on your delivery platform.


CHANGE STREAMS WITH MONGO TO LISTEN TO CHANGES INSIDE COLLECTIONS

Clear cart on successful payment

TO DO:
delivery info saving incorrect customer info. (Order Number, totalAmount