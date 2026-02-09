const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add investment amount']
    },
    initialValue: {
        type: Number,
        required: true
    },
    currentValue: {
        type: Number,
        required: true
    },
    roi: {
        type: Number,
        default: 0 // Return on Investment percentage
    },
    status: {
        type: String,
        enum: ['active', 'matured', 'withdrawn', 'cancelled'],
        default: 'active'
    },
    investmentType: {
        type: String,
        enum: ['full_ownership', 'partial_ownership', 'rent_income', 'development'],
        default: 'partial_ownership'
    },
    shares: {
        type: Number, // For partial ownership
        default: 1
    },
    maturityDate: Date,
    returns: [{
        amount: Number,
        type: String, // rent, appreciation, dividend
        date: Date,
        description: String
    }],
    documents: [{
        title: String,
        url: String,
        public_id: String,
        uploadedAt: Date
    }]
}, {
    timestamps: true
});

// Calculate ROI before save
investmentSchema.pre('save', function(next) {
    if (this.initialValue && this.currentValue) {
        this.roi = ((this.currentValue - this.initialValue) / this.initialValue) * 100;
    }
    next();
});

// Index for investor queries
investmentSchema.index({ investor: 1, status: 1 });
investmentSchema.index({ property: 1 });

module.exports = mongoose.model('Investment', investmentSchema);
