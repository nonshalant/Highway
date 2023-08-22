const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();

// Retreive cart details 
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ _id: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile.cart.inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
// ADD TO CART 
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { product } = req.body;
    let profile = await Profile.findOne({ _id: userId });
    const user = await User.findOne({ _id: userId });
    const fullName = user.fullName;

    if (!profile) {
      profile = new Profile({  
        _id: userId,
        fullName,
        cart: {
          _id: userId,
          inventory: [
            {
              storeName: product.storeName,
              productName: product.productName,
              amount: 1,
              price: product.price,
              size: product.size,
              category: product.category,
              productType: product.type,
              description: product.description,
              image: product.image,
            },
          ],
        },
      });
    } else {
      const existingItem = profile.cart.inventory.find(
        (item) => item.productName === product.productName
      );

      if (existingItem) {
        existingItem.amount += 1;
      } else {
        profile.cart.inventory.push({
          storeName: product.storeName,
          productName: product.productName,
          amount: 1,
          price: product.price,
          size: product.size,
          category: product.category,
          productType: product.type,
          description: product.description,
          image: product.image,
        });
      }
    }

    await profile.save();
    res.status(200).json(profile.cart.inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// increment or decrement cart item amount
router.patch('/update/:itemId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const productName = req.params.itemId;
    const profile = await Profile.findOne({ _id: userId });
    const inventory = profile.cart.inventory;
    const targetItem = inventory.find(
      (item) => item.productName === productName
    );

    if (!targetItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (req.body.event === '+') {
      targetItem.amount += 1;
    } else if (req.body.event === '-') {
      targetItem.amount -= 1;
      if (targetItem.amount === 0) {
        const itemIndex = inventory.findIndex(
          (item) => item.productName === productName
        );
        inventory.splice(itemIndex, 1);
      }
    }

    await profile.save();
    res.status(200).json(profile.cart.inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// remove item from cart
router.patch('/remove/:productName', auth, async(req, res) => {
  try {
    const userId = req.user.id;
    const itemToRemove = req.params.productName
    const profile = await Profile.findOne({_id: userId});
    const targetItemIndex = profile.cart.inventory.findIndex(
      item => item.productName === itemToRemove
    )

    if (targetItemIndex === -1) {
      res.json('Item not found');
    } else {
      profile.cart.inventory.splice(targetItemIndex, 1);
    };

    await profile.save();
  } catch (error) {
    console.error(error)
  }
});

// get the session cart with the cart items for order review  
router.get('/order-review', auth, async(req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({_id: userId});
    const orderReviewItems = profile.cart.checkOutItems;
  
    res.status(200).json({ cart: orderReviewItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});
 
// selected cart items sending to order rerview 
router.post('/order-review', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemsToReview = req.body.itemsSelected;
    let profile = await Profile.findOne({ _id: userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }  

    const arr = cartItemsToReview.map(item => ({
      storeName: item.storeName,
      productName: item.productName,
      amount: item.amount,
      price: item.price,
      size: item.size 
    }));

    profile.cart.checkOutItems = arr;
    await profile.save();
    res.status(200).json({ message: 'Items added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});


  
module.exports = router;