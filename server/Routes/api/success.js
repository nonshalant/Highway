const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile')
const DeliveryOrder = require('../../models/DeliveryOrder');
const User = require('../../models/User');
  
router.post('/', auth, async(req, res)=>{ 
    try {
        let deliveryOrder;
        const userId = req.user.id;
        const user = await User.findOne({_id: userId})
        const profile = await Profile.findOne({_id: userId})
        const orderedItems = profile.cart.checkOutItems; 
        const randomNumber = crypto.randomBytes(32).toString('hex');
        const orderedItemsTotal = orderedItems.map(item => item.price).reduce((acc, initalVal)=> {
            return acc + initalVal
        }, 0);

        if(!profile){
            res.status(404).json({message: 'You have no profile'})
        }else {
            deliveryOrder = new DeliveryOrder({
                isSuccessful: 'true',
                pickUpLocation: profile.address,
                customer: user.fullName,
                orderNumber: randomNumber,
                items: orderedItems.map(item => ({
                    itemName: item.productName,
                    quantity: item.amount,
                    price: item.price, 
                })),
                status: 'Processing',
                totalAmount: orderedItemsTotal,
                deliveryInformation: {
                    address: profile.address,
                    instructions: '',
                }
            })
        }
        await deliveryOrder.save()
    } catch (error) {
        console.error(error);
    }
})

module.exports = router; 