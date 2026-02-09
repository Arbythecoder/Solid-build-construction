const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { checkDealAccess } = require('../middleware/rbacMiddleware');
const {
    createDeal,
    getMyDeals,
    getDealById,
    confirmDeal,
    completeDeal,
    cancelDeal
} = require('../controllers/dealController');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Create new deal
router.post('/', createDeal);

// Get all deals for current user
router.get('/', getMyDeals);

// Get specific deal (with access check)
router.get('/:id', checkDealAccess, getDealById);

// Confirm deal (landlord only)
router.put('/:id/confirm', checkDealAccess, confirmDeal);

// Complete deal (mark as paid)
router.put('/:id/complete', checkDealAccess, completeDeal);

// Cancel deal
router.put('/:id/cancel', checkDealAccess, cancelDeal);

module.exports = router;
