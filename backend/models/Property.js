const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    type: {
        type: String,
        required: true,
        enum: ['apartment', 'house', 'land', 'commercial', 'luxury']
    },
    status: {
        type: String,
        enum: ['available', 'rented', 'sold', 'featured'],
        default: 'available'
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    location: {
        address: String,
        city: String,
        state: String,
        coordinates: {
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: [Number]
        }
    },
    features: {
        bedrooms: Number,
        bathrooms: Number,
        parkingSpaces: Number,
        furnished: Boolean,
        airConditioned: Boolean,
        swimmingPool: Boolean,
        gym: Boolean,
        security: Boolean
    },
    premiumFeatures: {
        virtualTour: {
            url: String,
            public_id: String
        },
        priorityListing: Boolean,
        featuredStatus: Boolean,
        advancedAnalytics: Boolean,
        verifiedStatus: Boolean
    },
    images: [{
        url: String,
        public_id: String,
        isPrimary: Boolean
    }],
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    analytics: {
        lastViewed: Date,
        viewsThisMonth: Number,
        inquiries: Number,
        favorited: Number
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for geospatial queries
propertySchema.index({ 'location.coordinates': '2dsphere' });
// Index for text search
propertySchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Property', propertySchema);