const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    propertyInterest: { type: String },
    password: { type: String },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tenant", tenantSchema);