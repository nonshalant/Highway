const mongoose = require ('mongoose')

// MONGOOSE SCHEMAS 
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userNumber: {
        type: Number,
        required: true,
        unique: true,
        min: [10, 'Please enter valid phone number']
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        min: [6, 'Must be at least 6 characters'] 
    },
    userPassword: {
        type: String,
        required: true,
        min: [8, 'Must be at least 8 characters']
    },
    userAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = User = mongoose.model('user', userSchema)