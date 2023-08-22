const express = require ('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {validationResult} = require('express-validator')
const Profile = require("../../models/Profile")
const User = require("../../models/User")

// @Route GET /profile/me
// @desc  get current users profile Route
// @access private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await User.findOne({_id: req.user.id})
        if(!profile){
            return res.status(400).json('There is no profile for this user')
        }else{
            res.json(profile)
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
});

// @Route POST /profile
// @desc  Create or upadte a user profile
// @access private
router.post('/', auth, async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }else{
    
        try {
            let profile = await Profile.findOne({user: req.user.id})
           
            if(profile){
                // update 
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                    );
                    return res.json(profile)
                }else{
                    //create
                    profile = new Profile(profileFields)

                    await profile.save()
                    res.json(profile);
                }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')
        }
    } 
});

// @Route GET /profile
// @desc  Get all profiles
// @access public
router.get('/', async(req, res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error');
    }
})

// @Route GET /profile/user/:user_id
// @desc  Get all profile by user id
// @access public
router.get('/user/:user_id', async(req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['fullName']);
        if(!profile) return res.status(400).json({msg: "Profile not found"})

        res.json(profile); 
    } catch (error) {
        console.error(error.message)
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: "Profile not found"})
        }
        res.status(500).send('server error');
    }
});
    
module.exports = router;