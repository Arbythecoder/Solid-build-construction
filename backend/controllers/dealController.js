const Deal = require('../models/Deal');
const Property = require('../models/Property');
const User = require('../models/User');
const Notification = require('../models/Notification');

/**
 * Create a new deal
 * POST /api/deals
 */
exports.createDeal = async (req, res) => {
    try {
        const { propertyId, amount, dealType, paymentDetails, notes } = req.body;

        // Validation
        if (!propertyId || !amount || !dealType) {
            return res.status(400).json({
                success: false,
                message: 'Please provide property ID, amount, and deal type'
            });
        }

        // Verify property exists and is approved
        const property = await Property.findById(propertyId).populate('owner');
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        if (property.status !== 'approved') {
            return res.status(400).json({
                success: false,
                message: 'This property is not available for deals'
            });
        }

        // Check for existing pending deal for this property and buyer
        const existingDeal = await Deal.findOne({
            property: propertyId,
            buyer: req.user._id,
            status: { $in: ['pending', 'confirmed'] }
        });

        if (existingDeal) {
            return res.status(400).json({
                success: false,
                message: 'You already have a pending deal for this property'
            });
        }

        // Create deal
        const deal = await Deal.create({
            property: propertyId,
            buyer: req.user._id,
            landlord: property.owner._id,
            amount,
            dealType,
            paymentDetails: paymentDetails || {},
            notes,
            status: 'pending',
            paymentStatus: 'unpaid'
        });

        // Populate deal data
        const populatedDeal = await Deal.findById(deal._id)
            .populate('property', 'title location images price')
            .populate('buyer', 'name email phone')
            .populate('landlord', 'name email phone');

        // Create notification for landlord
        await Notification.create({
            recipient: property.owner._id,
            type: 'new_message',
            title: 'New Deal Submission',
            message: `${req.user.name} submitted a deal for ${property.title}`,
            data: {
                propertyId: property._id,
                userId: req.user._id,
                link: `/landlord/deals/${deal._id}`
            }
        });

        res.status(201).json({
            success: true,
            message: 'Deal created successfully. Awaiting landlord confirmation.',
            data: populatedDeal
        });
    } catch (error) {
        console.error('Create deal error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create deal',
            error: error.message
        });
    }
};

/**
 * Get all deals for current user (buyer or landlord)
 * GET /api/deals
 */
exports.getMyDeals = async (req, res) => {
    try {
        const { status, dealType } = req.query;

        // Build query based on user role
        let query = {};
        
        if (req.user.role === 'landlord') {
            query.landlord = req.user._id;
        } else if (req.user.role === 'tenant' || req.user.role === 'investor') {
            query.buyer = req.user._id;
        } else if (req.user.role === 'admin') {
            // Admin sees all deals
        } else {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view deals'
            });
        }

        // Add filters
        if (status) query.status = status;
        if (dealType) query.dealType = dealType;

        const deals = await Deal.find(query)
            .populate('property', 'title location images price status')
            .populate('buyer', 'name email phone')
            .populate('landlord', 'name email phone')
            .sort({ createdAt: -1 });

        // Calculate summary stats
        const stats = {
            total: deals.length,
            pending: deals.filter(d => d.status === 'pending').length,
            confirmed: deals.filter(d => d.status === 'confirmed').length,
            completed: deals.filter(d => d.status === 'completed').length,
            cancelled: deals.filter(d => d.status === 'cancelled').length
        };

        res.json({
            success: true,
            count: deals.length,
            stats,
            data: deals
        });
    } catch (error) {
        console.error('Get deals error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch deals',
            error: error.message
        });
    }
};

/**
 * Get single deal by ID
 * GET /api/deals/:id
 */
exports.getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id)
            .populate('property', 'title description location images price features')
            .populate('buyer', 'name email phone')
            .populate('landlord', 'name email phone');

        if (!deal) {
            return res.status(404).json({
                success: false,
                message: 'Deal not found'
            });
        }

        res.json({
            success: true,
            data: deal
        });
    } catch (error) {
        console.error('Get deal error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch deal',
            error: error.message
        });
    }
};

/**
 * Confirm deal (Landlord only)
 * PUT /api/deals/:id/confirm
 */
exports.confirmDeal = async (req, res) => {
    try {
        const deal = req.deal; // Set by checkDealAccess middleware

        // Only landlord can confirm
        if (deal.landlord.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Only the property owner can confirm this deal'
            });
        }

        if (deal.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Only pending deals can be confirmed'
            });
        }

        deal.status = 'confirmed';
        await deal.save();

        // Notify buyer
        await Notification.create({
            recipient: deal.buyer,
            type: 'new_message',
            title: 'Deal Confirmed',
            message: 'Your deal has been confirmed by the landlord',
            data: {
                propertyId: deal.property,
                link: `/tenant/deals/${deal._id}`
            }
        });

        const updatedDeal = await Deal.findById(deal._id)
            .populate('property', 'title location images')
            .populate('buyer', 'name email phone')
            .populate('landlord', 'name email phone');

        res.json({
            success: true,
            message: 'Deal confirmed successfully',
            data: updatedDeal
        });
    } catch (error) {
        console.error('Confirm deal error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to confirm deal',
            error: error.message
        });
    }
};

/**
 * Complete deal (update payment status)
 * PUT /api/deals/:id/complete
 */
exports.completeDeal = async (req, res) => {
    try {
        const deal = req.deal;
        const { paymentReference, transactionId } = req.body;

        if (deal.status !== 'confirmed') {
            return res.status(400).json({
                success: false,
                message: 'Deal must be confirmed before completion'
            });
        }

        deal.status = 'completed';
        deal.paymentStatus = 'paid';
        deal.paymentDetails = {
            ...deal.paymentDetails,
            reference: paymentReference,
            transactionId,
            paidAt: new Date(),
            amountPaid: deal.amount
        };
        deal.closedAt = new Date();
        await deal.save();

        // Update property status
        const property = await Property.findById(deal.property);
        if (property) {
            if (deal.dealType === 'sale') {
                property.status = 'sold';
            } else if (deal.dealType === 'rent') {
                property.status = 'rented';
            }
            await property.save();
        }

        // Notify both parties
        await Notification.create([
            {
                recipient: deal.buyer,
                type: 'payment_received',
                title: 'Deal Completed',
                message: 'Your payment has been confirmed. Deal is now complete.',
                data: { propertyId: deal.property, link: `/tenant/deals/${deal._id}` }
            },
            {
                recipient: deal.landlord,
                type: 'payment_received',
                title: 'Payment Received',
                message: 'Payment received for your property deal',
                data: { propertyId: deal.property, link: `/landlord/deals/${deal._id}` }
            }
        ]);

        const updatedDeal = await Deal.findById(deal._id)
            .populate('property', 'title location images')
            .populate('buyer', 'name email phone')
            .populate('landlord', 'name email phone');

        res.json({
            success: true,
            message: 'Deal completed successfully',
            data: updatedDeal
        });
    } catch (error) {
        console.error('Complete deal error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to complete deal',
            error: error.message
        });
    }
};

/**
 * Cancel deal
 * PUT /api/deals/:id/cancel
 */
exports.cancelDeal = async (req, res) => {
    try {
        const deal = req.deal;
        const { reason } = req.body;

        if (deal.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Completed deals cannot be cancelled'
            });
        }

        deal.status = 'cancelled';
        deal.cancellationReason = reason || 'No reason provided';
        deal.cancelledAt = new Date();
        await deal.save();

        // Notify the other party
        const notifyUser = deal.buyer.toString() === req.user._id.toString() 
            ? deal.landlord 
            : deal.buyer;

        await Notification.create({
            recipient: notifyUser,
            type: 'new_message',
            title: 'Deal Cancelled',
            message: `The deal has been cancelled. Reason: ${deal.cancellationReason}`,
            data: {
                propertyId: deal.property,
                link: `/deals/${deal._id}`
            }
        });

        res.json({
            success: true,
            message: 'Deal cancelled',
            data: deal
        });
    } catch (error) {
        console.error('Cancel deal error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel deal',
            error: error.message
        });
    }
};
