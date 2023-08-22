const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @Route GET api/favorite
// @desc  Get favorite stores
// @access private
router.get('/', auth, async(req, res)=>{ 
  try {
    const userId = req.user.id;
    let favoriteStores;   
    let profile = await Profile.findOne({_id: userId});
    const user = await User.findOne({_id: userId});
    let fullName = user.fullName;
  
    if(!profile){
      profile = new Profile({
        _id: userId,
        fullName,
        favorites:[]
      });
      await profile.save()
      res.status(400).json({message: 'Please create a profile'})
    }else {
      favoriteStores = profile.favorites
      res.status(200).json(favoriteStores);
    }
  } catch (error) { 
      console.error(error);
      res.status(500).send('Internal Error');
    }
}) 
 
// @Route POST api/favorite
// @desc  Adds a favorite store
// @access private
router.post('/', auth, async (req, res) => {
  const { storeName, storeImage, storeLocation, storeId } = req.body.storeDetails;
  const userId = req.user.id

  try {
    let profile = await Profile.findOne({_id: userId});
      
    if(!profile){
      let user = await User.findOne({_id: userId})
      let fullName = user.fullName;

      profile = new Profile({
        _id: userId,
        fullName,
        favorites: {
          storeName,
          storeImage,
          storeLocation,
          storeId
        },
      })
    }else {
      profile.favorites = {
        storeName,
        storeImage,
        storeLocation,
        // storeId
      }
    };

    await profile.save()
    res.status(200).json({ message: 'Favorite store added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// @Route DELETE api/favorite/:storeName
// @desc  Deletes a favorite store by store name
// @access private
router.delete('/:storeName', auth, async (req, res)=>{
  const storeToDelete = req.params.storeName;

  try {
    const userId = req.user.id
    const profile = await Profile.findOne({_id: userId})

    if (!profile) {
      return res.status(404).json({ error: 'Favorite store not found' });
    } else {
      const updateList = profile.favorites.findIndex(
        favoriteStore => favoriteStore.storeName === storeToDelete
      );

      if (updateList !== -1) {
        profile.favorites.splice(updateList, 1);
        await profile.save();
        res.status(200).json({ message: 'Favorite store deleted successfully' });
      } else {
        res.status(404).json({ error: 'Favorite store not found' });
      }
    }
  } catch (error) {
      console.error(error)
  }
});

module.exports = router;