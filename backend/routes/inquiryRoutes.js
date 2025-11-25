const express = require("express");
const router = express.Router();
const {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    deleteInquiry
} = require("../controllers/inquiryControllers");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public route - anyone can submit an inquiry
router.post("/", createInquiry);

// Admin routes - protected
router.get("/", protect, authorize("admin"), getAllInquiries);
router.get("/:id", protect, authorize("admin"), getInquiryById);
router.delete("/:id", protect, authorize("admin"), deleteInquiry);

module.exports = router;