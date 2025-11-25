const express = require("express");
const router = express.Router();
const Tenant = require("../models/Tenant");
const { protect } = require("../middleware/authMiddleware");

// Register a new tenant
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, address, propertyInterest } = req.body;

        // Check if tenant already exists
        const existingTenant = await Tenant.findOne({ email });
        if (existingTenant) {
            return res.status(400).json({ message: "Tenant with this email already exists" });
        }

        const tenant = await Tenant.create({
            name,
            email,
            phone,
            address,
            propertyInterest
        });

        res.status(201).json({
            message: "Tenant registered successfully",
            tenant: {
                id: tenant._id,
                name: tenant.name,
                email: tenant.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all tenants (protected - admin only)
router.get("/", protect, async (req, res) => {
    try {
        const tenants = await Tenant.find().select("-password");
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get tenant by ID (protected)
router.get("/:id", protect, async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id).select("-password");
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }
        res.json(tenant);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update tenant (protected)
router.put("/:id", protect, async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select("-password");

        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        res.json({ message: "Tenant updated successfully", tenant });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete tenant (protected - admin only)
router.delete("/:id", protect, async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndDelete(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }
        res.json({ message: "Tenant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
