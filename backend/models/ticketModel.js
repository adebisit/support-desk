const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please Select a Product'],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']
    },
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)