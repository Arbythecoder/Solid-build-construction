const Property = require('../models/Property');
const Investment = require('../models/Investment');
const Deal = require('../models/Deal');

/**
 * Check if user owns the property resource
 */
const checkPropertyOwnership = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ 
                success: false,
                message: 'Property not found' 
            });
        }

        // Admin can access all properties
        if (req.user.role === 'admin') {
            req.property = property;
            return next();
        }

        // Check if user owns the property
        if (property.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false,
                message: 'You are not authorized to access this property' 
            });
        }

        req.property = property;
        next();
    } catch (error) {
        console.error('Property ownership check error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error checking property ownership' 
        });
    }
};

/**
 * Check if user owns the investment resource
 */
const checkInvestmentOwnership = async (req, res, next) => {
    try {
        const investment = await Investment.findById(req.params.id);
        
        if (!investment) {
            return res.status(404).json({ 
                success: false,
                message: 'Investment not found' 
            });
        }

        // Admin can access all investments
        if (req.user.role === 'admin') {
            req.investment = investment;
            return next();
        }

        // Check if user owns the investment
        if (investment.investor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                success: false,
                message: 'You are not authorized to access this investment' 
            });
        }

        req.investment = investment;
        next();
    } catch (error) {
        console.error('Investment ownership check error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error checking investment ownership' 
        });
    }
};

/**
 * Check if user is part of the deal (buyer or landlord)
 */
const checkDealAccess = async (req, res, next) => {
    try {
        const deal = await Deal.findById(req.params.id);
        
        if (!deal) {
            return res.status(404).json({ 
                success: false,
                message: 'Deal not found' 
            });
        }

        // Admin can access all deals
        if (req.user.role === 'admin') {
            req.deal = deal;
            return next();
        }

        // Check if user is buyer or landlord
        const isBuyer = deal.buyer.toString() === req.user._id.toString();
        const isLandlord = deal.landlord.toString() === req.user._id.toString();

        if (!isBuyer && !isLandlord) {
            return res.status(403).json({ 
                success: false,
                message: 'You are not authorized to access this deal' 
            });
        }

        req.deal = deal;
        next();
    } catch (error) {
        console.error('Deal access check error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error checking deal access' 
        });
    }
};

/**
 * Scope properties query to user's role
 */
const scopePropertiesToRole = (req, res, next) => {
    // Public users and tenants/investors see only approved properties
    if (!req.user || req.user.role === 'tenant' || req.user.role === 'investor') {
        req.propertyFilter = { status: 'approved' };
    }
    // Landlords see only their own properties
    else if (req.user.role === 'landlord') {
        req.propertyFilter = { owner: req.user._id };
    }
    // Admin sees all properties
    else if (req.user.role === 'admin') {
        req.propertyFilter = {};
    }
    
    next();
};

module.exports = {
    checkPropertyOwnership,
    checkInvestmentOwnership,
    checkDealAccess,
    scopePropertiesToRole
};
