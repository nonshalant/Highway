const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
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
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'deliveryOrder'
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)