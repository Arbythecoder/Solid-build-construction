const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(process.env.MONGO_URI, options);
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📍 Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        console.log("⚠️  Running without database - some features may not work");
        // Don't exit - allow server to run for frontend development
    }
};

module.exports = connectDB;
