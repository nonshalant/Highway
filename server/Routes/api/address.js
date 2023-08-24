const express = require ('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require("../../models/Profile")
const User = require("../../models/User")

// Retreive current address 
router.get('/', auth, async(req, res) => {
  try {
    const userId = req.user.id 
    const exists = await Profile.findOne({_id: userId});
 
    if(exists){
      const {address} = exists;
      res.json({message: 'Successfully returned an address', address})
    }else{
      res.json({message: 'No address found'})
    }
  } catch (error) {
      console.error(error)
  }
});

// create or update users address 
router.post('/', auth, async (req, res) => {
  // let { clientStreet, clientAsf, clientCity, clientState, clientZip, clientNumber } = req.body.data;
  const userAddress = req.body.data
  let userId = req.user.id;

  try {
    // let newAddress = {
    //   streetAddress: clientStreet,
    //   aptSuiteFloor: clientAsf,
    //   city: clientCity,
    //   state: clientState,
    //   zip: clientZip,
    //   phone: clientNumber
    // };

    // Find the profile by user ID
    let updateProfile = await Profile.findOne({ _id: userId });

    if (!updateProfile) {
      let updateName = await User.findOne({_id: userId})
      let fullName = updateName.fullName

      updateProfile = new Profile({
        _id: userId,
        address: userAddress, 
        fullName,
      });
    } else {
      updateProfile.address = userAddress;
    }

    await updateProfile.save();

    res.json({ message: 'Address data saved successfully', updateProfile });
  } catch (error) {
    console.error('Error saving address data:', error);
    res.status(500).json({ message: 'Failed to save address data.' });
  } 
});

module.exports = router;