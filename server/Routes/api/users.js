const express = require ('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const User = require('../../models/User')
 
// @Route  POST api/Users
// @desc   Register A user
// @access Public
router.post('/signup', [check('fullName', 'Name is required!').not().isEmpty(),
    check('email', 'Please include a valid email!').isEmail(),
    check('userName', 'Please include a valid email!').not().isEmpty(),
    check('userPassword', "Please enter a valid password!").isLength({min: 8})]
 , async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {fullName, userName, email, userPassword, userNumber} = req.body;
    try {
        // check for userName and number as well
        let user = await User.findOne({email})
        let number = await User.findOne({userNumber})
        let name = await User.findOne({userName})

        if(user){
            res.status(400).json({errors: [{msg: 'user already exists with that email'}]})
        }else if(number){
            res.status(400).json({errors: [{msg: 'user already exists with that number'}]})
        }else if(name){
            res.status(400).json({errors:[ {msg:'user already exists with that username'}]})
        }else{
            user = new User({
                fullName,
                email,
                userName,
                userPassword,
                userNumber
            })
    
            const salt = await bcrypt.genSalt(10)
    
            user.userPassword = await bcrypt.hash(userPassword, salt)
    
            await user.save()
    
            const payload = {
                user: {
                    id: user.id
                }
            }
    
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000}, (error, token)=>{
                if(error) throw error;
                res.json({token})
            })
    
        } 
    }catch (error) {
        console.error(error.message)
        res.status(500).send('server Error ')
    }
})



module.exports = router;