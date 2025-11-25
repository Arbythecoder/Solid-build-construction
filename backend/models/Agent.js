const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    homeAddress: { type: String },
    officeAddress: { type: String },
    password: { type: String },
    idCard: { type: String },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Agent", agentSchema);