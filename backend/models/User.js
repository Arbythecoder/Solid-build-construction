const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"]
    },
    role: {
        type: String,
        enum: ["admin", "landlord", "tenant", "investor", "agent"],
        default: "tenant"
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    profileImage: String,
    phone: String,
    address: String,
    
    // Landlord-specific fields
    numberOfProperties: String,
    propertyTypes: [String],
    hearAboutUs: String,
    
    // Tenant-specific fields
    occupation: String,
    employer: String,
    monthlyIncome: String,
    preferredLocation: String,
    moveInDate: Date,
    
    // Investor-specific fields
    investorToken: {
        type: String,
        unique: true,
        sparse: true // Only required for investors
    },
    investmentBudget: String,
    investmentGoal: String,
    riskTolerance: {
        type: String,
        enum: ['low', 'moderate', 'high']
    },
    investmentHorizon: String,
    
    // Agent-specific fields
    yearsOfExperience: String,
    currentEmployer: String,
    licenseNumber: String,
    specialization: [String],
    motivation: String,
    agentStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Encrypt password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);