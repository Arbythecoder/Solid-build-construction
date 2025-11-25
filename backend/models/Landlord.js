const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    propertyAddress: { type: String },
    idCard: { type: String },
    password: { type: String },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Landlord", landlordSchema);
