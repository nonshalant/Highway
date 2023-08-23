const mongoose = require('mongoose');

const deliveryOrderSchema = new mongoose.Schema({
    isSuccessful: {
        type: String,
        required: true,
    },
    pickUpLocation: {
        type: String,
        required: true,
    },
    customer: {
        type: String,
        required: true,
      },
    orderNumber: {
        type: String,
        required: true,
        unique: true,
      },
    items: [
        {
            itemName: {
            type: String,
            required: true,
            },
            quantity: {
            type: Number,
            required: true,
            },
            price: {
            type: Number,
            required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: ['Processing', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered'],
        default: 'Processing',
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    deliveryInformation: {
        address: String,
        instructions: String,
        estimatedDeliveryTime: Date,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
}); 

module.exports = DeliveryOrder = mongoose.model('deliveryOrder', deliveryOrderSchema);