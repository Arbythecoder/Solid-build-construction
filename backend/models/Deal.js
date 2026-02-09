const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add a deal amount']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'partial', 'paid'],
        default: 'unpaid'
    },
    paymentDetails: {
        method: String, // bank_transfer, paystack, cash
        reference: String,
        transactionId: String,
        paidAt: Date,
        amountPaid: Number
    },
    dealType: {
        type: String,
        enum: ['sale', 'rent', 'lease'],
        required: true
    },
    notes: String,
    closedAt: Date,
    cancelledAt: Date,
    cancellationReason: String
}, {
    timestamps: true
});

// Prevent duplicate deals for the same property
dealSchema.index({ property: 1, buyer: 1, status: 1 });

module.exports = mongoose.model('Deal', dealSchema);
