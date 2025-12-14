const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Tenant = require("../models/Tenant");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Register a new tenant
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, address, propertyInterest } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Check if tenant already exists
        const existingTenant = await Tenant.findOne({ email });
        if (existingTenant) {
            return res.status(400).json({ message: "Tenant with this email already exists" });
        }

        // Create User account (for login)
        const user = await User.create({
            name,
            email,
            password,
            role: "tenant",
            phone,
            address
        });

        // Create Tenant profile
        const tenant = await Tenant.create({
            name,
            email,
            phone,
            address,
            propertyInterest,
            userId: user._id
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "Tenant registered successfully. You can now login!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenantId: tenant._id
            }
        });
    } catch (error) {
        console.error("Tenant registration error:", error);
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
