const mongoose = require("mongoose"); // Import mongoose

// Define the Inquiry schema
const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" }, // Reference to Property model
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export the Inquiry model
module.exports = mongoose.model("Inquiry", inquirySchema);