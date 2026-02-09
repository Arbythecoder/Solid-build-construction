const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, ...roleSpecificData } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide name, email, and password" 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                success: false,
                message: "Password must be at least 6 characters" 
            });
        }

        // Email validation
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide a valid email address" 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists with this email" 
            });
        }

        // Generate investor token if role is investor
        let investorToken = null;
        if (role === 'investor') {
            investorToken = 'INV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        }

        // Create new user with role-specific data (password will be hashed by the pre-save hook)
        const newUser = new User({
            name,
            email,
            password,
            role: role || "tenant",
            investorToken,
            ...roleSpecificData
        });
        await newUser.save();

        // Generate token (using 'id' not 'userId' for consistency)
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
                investorToken: newUser.investorToken
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                success: false,
                message: `A user with this ${field} already exists` 
            });
        }

        res.status(500).json({ 
            success: false,
            message: "Server error during registration", 
            error: error.message 
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide email and password" 
            });
        }

        // Find user (include password for comparison since it's select: false in schema)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Generate token (using 'id' not 'userId' for consistency)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                _id: user._id, // For backward compatibility
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                investorToken: user.investorToken,
                avatar: user.profileImage
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error during login", 
            error: error.message 
        });
    }
};