const express = require("express");
const User = require("../models/User");
const Property = require("../models/Property");
const Inquiry = require("../models/Inquiry");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize("admin"));

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
});

// Get admin dashboard stats
router.get("/stats", async (req, res) => {
    try {
        const [
            totalUsers,
            totalProperties,
            pendingProperties,
            totalInquiries,
            landlords,
            tenants,
            agents,
            investors
        ] = await Promise.all([
            User.countDocuments(),
            Property.countDocuments(),
            Property.countDocuments({ status: "pending" }),
            Inquiry.countDocuments(),
            User.countDocuments({ role: "landlord" }),
            User.countDocuments({ role: "tenant" }),
            User.countDocuments({ role: "agent" }),
            User.countDocuments({ role: "investor" })
        ]);

        // Get properties by status
        const propertiesByStatus = await Property.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // Get recent users
        const recentUsers = await User.find()
            .select("name email role createdAt")
            .sort({ createdAt: -1 })
            .limit(5);

        // Get recent properties
        const recentProperties = await Property.find()
            .select("title price location status createdAt")
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            data: {
                totalUsers,
                totalProperties,
                pendingProperties,
                totalInquiries,
                usersByRole: {
                    landlords,
                    tenants,
                    agents,
                    investors
                },
                propertiesByStatus,
                recentUsers,
                recentProperties
            }
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
});

// Update user role
router.put("/users/:id/role", async (req, res) => {
    try {
        const { role } = req.body;
        const validRoles = ["admin", "landlord", "tenant", "investor", "agent"];

        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ message: "Failed to update user role" });
    }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Don't allow deleting self
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "Cannot delete yourself" });
        }

        await user.deleteOne();

        res.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
});

// Get pending properties
router.get("/properties/pending", async (req, res) => {
    try {
        const properties = await Property.find({ status: "pending" })
            .populate("owner", "name email phone")
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        console.error("Error fetching pending properties:", error);
        res.status(500).json({ message: "Failed to fetch pending properties" });
    }
});

// Approve property
router.put("/properties/:id/approve", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        property.status = "approved";
        property.approvedBy = req.user._id;
        property.approvedAt = new Date();
        await property.save();

        // TODO: Send notification/email to landlord
        
        res.json({
            success: true,
            message: "Property approved successfully",
            data: property
        });
    } catch (error) {
        console.error("Error approving property:", error);
        res.status(500).json({ message: "Failed to approve property" });
    }
});

// Reject property
router.put("/properties/:id/reject", async (req, res) => {
    try {
        const { reason } = req.body;
        const property = await Property.findById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        property.status = "rejected";
        property.rejectedBy = req.user._id;
        property.rejectedAt = new Date();
        property.rejectionReason = reason || "Does not meet platform standards";
        await property.save();

        // TODO: Send notification/email to landlord
        
        res.json({
            success: true,
            message: "Property rejected",
            data: property
        });
    } catch (error) {
        console.error("Error rejecting property:", error);
        res.status(500).json({ message: "Failed to reject property" });
    }
});

module.exports = router;
