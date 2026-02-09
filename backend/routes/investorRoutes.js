const express = require("express");
const Property = require("../models/Property");
const Investment = require("../models/Investment");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get investor dashboard
router.get("/dashboard", async (req, res) => {
    try {
        // Get investor's active investments
        const investments = await Investment.find({
            investor: req.user._id,
            status: 'active'
        }).populate('property', 'title price location images');

        // Calculate portfolio metrics
        const totalInvested = investments.reduce((sum, inv) => sum + inv.initialValue, 0);
        const currentPortfolioValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalROI = totalInvested > 0 
            ? ((currentPortfolioValue - totalInvested) / totalInvested) * 100 
            : 0;

        // Get investment opportunities (premium properties)
        const opportunities = await Property.find({
            status: "approved",
            $or: [
                { isPremium: true },
                { price: { $gte: 100000000 } } // Properties worth 100M+
            ]
        })
            .select("title price location images type")
            .sort({ price: -1 })
            .limit(6);

        res.json({
            success: true,
            data: {
                totalInvestments: investments.length,
                activeDeals: investments.filter(inv => inv.status === 'active').length,
                totalROI: `${totalROI.toFixed(2)}%`,
                portfolioValue: `₦${currentPortfolioValue.toLocaleString()}`,
                totalInvested: `₦${totalInvested.toLocaleString()}`,
                investments,
                opportunities
            }
        });
    } catch (error) {
        console.error("Error fetching investor dashboard:", error);
        res.status(500).json({ message: "Failed to fetch dashboard" });
    }
});

// Get investment opportunities
router.get("/opportunities", async (req, res) => {
    try {
        const opportunities = await Property.find({
            status: "approved",
            $or: [
                { isPremium: true },
                { price: { $gte: 50000000 } }
            ]
        })
            .select("title description price location images type listingType features amenities")
            .sort({ price: -1 });

        res.json({
            success: true,
            count: opportunities.length,
            data: opportunities
        });
    } catch (error) {
        console.error("Error fetching opportunities:", error);
        res.status(500).json({ message: "Failed to fetch opportunities" });
    }
});

// Get investor's investments (placeholder)
router.get("/investments", async (req, res) => {
    try {
        const investments = await Investment.find({ investor: req.user._id })
            .populate('property', 'title price location images status')
            .sort({ createdAt: -1 });

        // Calculate total metrics
        const totalInvested = investments.reduce((sum, inv) => sum + inv.initialValue, 0);
        const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalROI = totalInvested > 0 
            ? ((totalCurrentValue - totalInvested) / totalInvested) * 100 
            : 0;

        res.json({
            success: true,
            count: investments.length,
            metrics: {
                totalInvested,
                totalCurrentValue,
                totalROI: `${totalROI.toFixed(2)}%`,
                profitLoss: totalCurrentValue - totalInvested
            },
            data: investments
        });
    } catch (error) {
        console.error("Error fetching investments:", error);
        res.status(500).json({ message: "Failed to fetch investments" });
    }
});

// Create investment interest (placeholder)
router.post("/investments", async (req, res) => {
    try {
        const { propertyId, amount, investmentType, shares } = req.body;

        if (!propertyId || !amount) {
            return res.status(400).json({ message: "Property ID and amount are required" });
        }

        // Verify property exists and is approved
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        if (property.status !== 'approved') {
            return res.status(400).json({ message: "Property is not approved for investment" });
        }

        // Create investment record
        const investment = await Investment.create({
            investor: req.user._id,
            property: propertyId,
            amount,
            initialValue: amount,
            currentValue: amount, // Starts equal to initial value
            investmentType: investmentType || 'partial_ownership',
            shares: shares || 1,
            status: 'active'
        });

        const populatedInvestment = await Investment.findById(investment._id)
            .populate('property', 'title price location images');

        res.status(201).json({
            success: true,
            message: "Investment created successfully",
            data: populatedInvestment
        });
    } catch (error) {
        console.error("Error creating investment:", error);
        res.status(500).json({ message: "Failed to create investment" });
    }
});

module.exports = router;
