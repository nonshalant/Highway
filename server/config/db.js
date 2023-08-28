const mongoose = require('mongoose');
const config = require ('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        })
          console.log('Mongo connected!!!')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
} 


module.exports = connectDB