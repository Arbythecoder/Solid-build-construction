const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { checkPropertyOwnership, scopePropertiesToRole } = require("../middleware/rbacMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    getAllProperties,
    filterProperties,
    getPremiumProperties,
    getPropertyAnalytics,
    uploadPropertyImages,
    addVirtualTour,
    togglePriorityListing,
    getPropertyStats
} = require("../controllers/propertyController");

const router = express.Router();

// Basic Property Routes
router.route('/')
    .get(getAllProperties)
    .post(protect, authorize('landlord', 'admin'), upload.array('images', 5), createProperty);

router.route('/:id')
    .get(getPropertyById)
    .put(protect, authorize('landlord', 'admin'), checkPropertyOwnership, updateProperty)
    .delete(protect, authorize('landlord', 'admin'), checkPropertyOwnership, deleteProperty);

// Advanced Search & Filtering
router.get('/search/advanced', filterProperties);
router.get('/filter/custom', filterProperties);

// Image Upload Routes
router.post(
    '/:id/images',
    protect,
    authorize('landlord', 'admin'),
    checkPropertyOwnership,
    upload.array('images', 5),
    uploadPropertyImages
);

// Premium Features
router.route('/premium')
    .get(protect, getPremiumProperties)
    .post(
        protect,
        authorize('premium', 'admin'),
        upload.array('images', 10),
        createProperty
    );

router.post(
    '/premium/:id/virtual-tour',
    protect,
    authorize('premium', 'admin'),
    upload.single('tourFile'),
    addVirtualTour
);

router.put(
    '/premium/:id/priority',
    protect,
    authorize('premium', 'admin'),
    togglePriorityListing
);

// Analytics
router.get(
    '/analytics/:id',
    protect,
    authorize('premium', 'admin'),
    getPropertyAnalytics
);

router.get(
    '/stats/overview',
    protect,
    authorize('admin'),
    getPropertyStats
);

module.exports = router;
