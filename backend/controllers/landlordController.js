const Property = require("../models/Property");
const User = require("../models/User");

// @desc    Get landlord's properties
// @route   GET /landlords/properties
// @access  Private (Landlord)
exports.getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        console.error("Get properties error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch properties",
            error: error.message
        });
    }
};

// @desc    Get landlord dashboard statistics
// @route   GET /landlords/stats
// @access  Private (Landlord)
exports.getStats = async (req, res) => {
    try {
        const landlordId = req.user.id;
        const properties = await Property.find({ owner: landlordId });
        const total = properties.length;
        const active = properties.filter(p => p.status === 'approved').length;
        const pending = properties.filter(p => p.status === 'pending').length;
        const totalViews = properties.reduce((sum, property) => sum + (property.views || 0), 0);
        const revenue = properties.filter(p => p.status === 'approved').reduce((sum, property) => sum + (property.price || 0), 0);

        res.status(200).json({
            success: true,
            data: {
                total,
                active,
                pending,
                views: totalViews,
                revenue: revenue > 0 ? `${(revenue / 1000000).toFixed(1)}M` : '0'
            }
        });
    } catch (error) {
        console.error("Get stats error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch stats", error: error.message });
    }
};

// @desc    Get maintenance requests
// @route   GET /landlords/maintenance
// @access  Private (Landlord)
exports.getMaintenanceRequests = async (req, res) => {
    try {
        res.status(200).json({ success: true, data: [] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch maintenance requests", error: error.message });
    }
};

// @desc    Update maintenance request
// @route   PUT /landlords/maintenance/:id
// @access  Private (Landlord)
exports.updateMaintenanceRequest = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "Maintenance request updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update maintenance request", error: error.message });
    }
};
