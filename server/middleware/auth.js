const jwt = require('jsonwebtoken');
const config = require('config')

module.exports= function(req, res, next){
    //Get the token from the header
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({msg: 'no token access denied'})
    }else{
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded.user
            
            next();
        } catch (error) {
            console.error(error.message)
            res.status(401).json({msg : 'token is not valid'})
        }
    }
}