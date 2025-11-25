const express = require("express");
const {
    getMyProperties,
    getStats,
    getMaintenanceRequests,
    updateMaintenanceRequest
} = require("../controllers/landlordController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get landlord's properties
router.get("/properties", getMyProperties);

// Get landlord statistics
router.get("/stats", getStats);

// Maintenance requests
router.get("/maintenance", getMaintenanceRequests);
router.put("/maintenance/:id", updateMaintenanceRequest);

module.exports = router;
