const express = require ('express');
const router = express.Router();
const auth = require("../../middleware/auth")
const User = require('../../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator') 

// @Route GET auth
// @desc  Test Route
// @access Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-userPassword')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error ')
    }  
});

// @Route  POST api/auth
// @desc   authenticate user and get token
// @access Public
router.post('/', [
    check('email', 'Please include a valid email!').isEmail(),
    check('userPassword', "Password is required!").exists()]
 , async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, userPassword} = req.body;
    
    try {
        // check for userName as well
        let user = await User.findOne({email})
        if(!user){
            res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
        }else{
            const isMatch = await bcrypt.compare(userPassword, user.userPassword);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            } else {
                const payload = {
                    user: {
                        id: user.id,
                        
                    }
                };
                jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000}, (error, token)=>{
                    if(error) throw error;
                    res.json({token})
                })
            }
        } 
    }catch (error) {
        console.error(error.message)
        res.status(500).send('server Error')
    }
})

// @Route  POST api/auth
// @desc   authenticate user phone numbers
// @access Public
router.post('/verify-number', async(req, res)=>{
 
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_PHONE_NUMBER;
    const client = require("twilio")(accountSid, authToken);

    // Use the credentials in your Twilio client setup and other Twilio-related code
    
    client.verify.v2
        .services(verifySid)
        .verifications.create({ to: "+16463522512", channel: "sms" })
        .then((verification) => console.log(verification.status))
        .then(() => {
            const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
            });
            readline.question("Please enter the OTP:", (otpCode) => {
            client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: "+16463522512", code: otpCode })
                .then((verification_check) => console.log(verification_check.status))
                .then(() => readline.close());
            });
    }); 
})

module.exports = router;