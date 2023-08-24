const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    // address: {
    //     streetAddress: String,
    //     aptSuiteFloor: String,
    //     city: String,
    //     zip: String,
    // },
    address: String,
    cart: {
        inventory: [
            {
                storeName: String,
                productName: String,
                amount: Number,
                price: Number,
                size: String,
                category: String,
                productType: String,
                description: String,
                image: String
            }
        ],
        checkOutItems: [
            {
                storeName: String,
                productName: String,
                amount: Number,
                price: Number,
                size: String,
            }
        ] 
    },
    fullName: {
        type: String,
    },
    favorites: [
        {
            storeImage: String,
            storeName: String,
            storeLocation: String,
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)