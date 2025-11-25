const Inquiry = require("../models/Inquiry");

// Create new inquiry (contact form submission)
exports.createInquiry = async (req, res) => {
    try {
        const { name, email, message, property } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Create new inquiry
        const newInquiry = new Inquiry({
            name,
            email,
            message,
            property: property || null
        });

        await newInquiry.save();

        res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully",
            data: newInquiry
        });
    } catch (error) {
        console.error("Inquiry creation error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while submitting inquiry",
            error: error.message
        });
    }
};

// Get all inquiries (Admin only)
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find()
            .populate('property', 'title location price')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: inquiries.length,
            data: inquiries
        });
    } catch (error) {
        console.error("Get inquiries error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching inquiries",
            error: error.message
        });
    }
};

// Get single inquiry by ID
exports.getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id)
            .populate('property', 'title location price');

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            data: inquiry
        });
    } catch (error) {
        console.error("Get inquiry error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching inquiry",
            error: error.message
        });
    }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully"
        });
    } catch (error) {
        console.error("Delete inquiry error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting inquiry",
            error: error.message
        });
    }
};
