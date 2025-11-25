const express = require("express");
const multer = require("multer");
const router = express.Router();
const Agent = require("../models/Agent");
const { protect } = require("../middleware/authMiddleware");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "agent-id-" + uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only images and PDF files are allowed"), false);
        }
    }
});

// Register a new agent
router.post("/register", upload.single("idCard"), async (req, res) => {
    try {
        const { fullName, email, phone, homeAddress, officeAddress } = req.body;

        // Check if agent already exists
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({ message: "Agent with this email already exists" });
        }

        const agent = await Agent.create({
            name: fullName,
            email,
            phone,
            homeAddress,
            officeAddress,
            idCard: req.file ? `/uploads/${req.file.filename}` : null
        });

        res.status(201).json({
            message: "Agent registered successfully. We will verify your details and get back to you shortly.",
            agent: {
                id: agent._id,
                name: agent.name,
                email: agent.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all agents (protected - admin only)
router.get("/", protect, async (req, res) => {
    try {
        const agents = await Agent.find().select("-password");
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get agent by ID (protected)
router.get("/:id", protect, async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id).select("-password");
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }
        res.json(agent);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update agent (protected)
router.put("/:id", protect, async (req, res) => {
    try {
        const agent = await Agent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select("-password");

        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }

        res.json({ message: "Agent updated successfully", agent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete agent (protected - admin only)
router.delete("/:id", protect, async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }
        res.json({ message: "Agent deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
