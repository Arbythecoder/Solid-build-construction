const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// Create Property with Premium Features
exports.createProperty = asyncHandler(async (req, res) => {
    const isPremium = req.user.role === 'premium' || req.user.role === 'admin';
    
    const property = await Property.create({
        ...req.body,
        owner: req.user.id,
        isPremium,
        features: {
            ...req.body.features,
            virtualTour: isPremium ? req.body.virtualTour : undefined,
            priorityListing: isPremium,
            advancedAnalytics: isPremium
        }
    });

    if (req.files) {
        const uploadPromises = req.files.map(file => 
            cloudinary.uploader.upload(file.path, {
                folder: `solidbuild-properties/${isPremium ? 'premium' : 'standard'}`,
                quality: isPremium ? 'auto:best' : 'auto:good',
                fetch_format: 'auto',
                flags: 'progressive'
            })
        );

        const uploadedImages = await Promise.all(uploadPromises);
        property.images = uploadedImages.map(img => ({
            url: img.secure_url,
            public_id: img.public_id
        }));
        await property.save();
    }

    res.status(201).json({
        success: true,
        data: property
    });
});

// Get Properties with Advanced Filtering
exports.filterProperties = asyncHandler(async (req, res) => {
    const {
        location,
        priceMin,
        priceMax,
        type,
        bedrooms,
        bathrooms,
        furnished,
        sortBy,
        page = 1,
        limit = 10
    } = req.query;

    const query = {};

    // Build query
    if (location) query['location.city'] = new RegExp(location, 'i');
    if (priceMin) query.price = { $gte: priceMin };
    if (priceMax) query.price = { ...query.price, $lte: priceMax };
    if (type) query.type = type;
    if (bedrooms) query['features.bedrooms'] = bedrooms;
    if (bathrooms) query['features.bathrooms'] = bathrooms;
    if (furnished) query['features.furnished'] = furnished === 'true';

    const skip = (page - 1) * limit;

    const properties = await Property.find(query)
        .sort(sortBy ? { [sortBy]: -1 } : { createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('owner', 'name email phone');

    const total = await Property.countDocuments(query);

    res.status(200).json({
        success: true,
        count: properties.length,
        pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / limit),
            total
        },
        data: properties
    });
});

// Add Virtual Tour (Premium Feature)
exports.addVirtualTour = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
        throw new ErrorResponse('Property not found', 404);
    }

    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        throw new ErrorResponse('Not authorized to update this property', 403);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
        folder: 'solidbuild-properties/virtual-tours',
        eager: [
            { format: 'mp4', quality: 'auto:best' }
        ]
    });

    property.virtualTour = {
        url: result.secure_url,
        public_id: result.public_id
    };

    await property.save();

    res.status(200).json({
        success: true,
        data: property
    });
});

// Get All Properties
exports.getAllProperties = asyncHandler(async (req, res) => {
    const { status, location, type, minPrice, maxPrice } = req.query;

    // Build query - show approved properties by default, or all if no status filter
    const query = {};

    // Only filter by status if explicitly requested
    if (status) {
        query.status = status;
    }
    // If no status filter, show all properties (available, featured, etc.)

    // Location filter
    if (location) {
        query.$or = [
            { 'location.city': new RegExp(location, 'i') },
            { 'location.area': new RegExp(location, 'i') },
            { 'location.state': new RegExp(location, 'i') },
            { 'location.address': new RegExp(location, 'i') }
        ];
    }

    // Type filter
    if (type) {
        query.type = type;
    }

    // Price range filter
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query)
        .populate('owner', 'name email phone')
        .sort({ isPremium: -1, createdAt: -1 });

    res.status(200).json({
        success: true,
        count: properties.length,
        data: properties
    });
});

// Get Property by ID
exports.getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id)
        .populate('owner', 'name email phone');

    if (!property) {
        throw new ErrorResponse('Property not found', 404);
    }

    res.status(200).json({
        success: true,
        data: property
    });
});

// Update Property
exports.updateProperty = asyncHandler(async (req, res) => {
    let property = await Property.findById(req.params.id);

    if (!property) {
        throw new ErrorResponse('Property not found', 404);
    }

    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        throw new ErrorResponse('Not authorized to update this property', 403);
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: property
    });
});

// Delete Property
exports.deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
        throw new ErrorResponse('Property not found', 404);
    }

    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        throw new ErrorResponse('Not authorized to delete this property', 403);
    }

    // Delete images from cloudinary
    if (property.images && property.images.length > 0) {
        for (const image of property.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }
    }

    await property.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// Get Premium Properties
exports.getPremiumProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find({
        isPremium: true,
        status: 'approved'
    })
    .populate('owner', 'name email phone')
    .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: properties.length,
        data: properties
    });
});

// Upload Property Images
exports.uploadPropertyImages = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
        throw new ErrorResponse('Property not found', 404);
    }

    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        throw new ErrorResponse('Not authorized to update this property', 403);
    }

    if (req.files) {
        const uploadPromises = req.files.map(file =>
            cloudinary.uploader.upload(file.path, {
                folder: 'solidbuild-properties/images',
                quality: 'auto:good',
                fetch_format: 'auto'
            })
        );

        const uploadedImages = await Promise.all(uploadPromises);
        const newImages = uploadedImages.map(img => ({
            url: img.secure_url,
            public_id: img.public_id
        }));

        property.images = [...(property.images || []), ...newImages];
        await property.save();
    }

    res.status(200).json({
        success: true,
        data: property
    });
});

// Toggle Priority Listing
exports.togglePriorityListing = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
        throw new ErrorResponse('Property not found', 404);
    }

    property.features.priorityListing = !property.features.priorityListing;
    await property.save();

    res.status(200).json({
        success: true,
        data: property
    });
});

// Get Property Analytics
exports.getPropertyAnalytics = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
        throw new ErrorResponse('Property not found', 404);
    }

    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        throw new ErrorResponse('Not authorized to view analytics', 403);
    }

    const analytics = {
        views: property.views || 0,
        inquiries: property.inquiries || 0,
        favorites: property.favorites || 0,
        lastUpdated: property.updatedAt
    };

    res.status(200).json({
        success: true,
        data: analytics
    });
});

// Get Property Stats (Admin)
exports.getPropertyStats = asyncHandler(async (req, res) => {
    const totalProperties = await Property.countDocuments();
    const approvedProperties = await Property.countDocuments({ status: 'approved' });
    const pendingProperties = await Property.countDocuments({ status: 'pending' });
    const rejectedProperties = await Property.countDocuments({ status: 'rejected' });
    const premiumProperties = await Property.countDocuments({ isPremium: true });

    res.status(200).json({
        success: true,
        data: {
            total: totalProperties,
            approved: approvedProperties,
            pending: pendingProperties,
            rejected: rejectedProperties,
            premium: premiumProperties
        }
    });
});
