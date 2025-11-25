require("dotenv").config();
const mongoose = require("mongoose");

console.log("Testing MongoDB Connection...");
console.log("Connection String:", process.env.MONGO_URI.replace(/:[^:@]+@/, ':****@')); // Hide password

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ SUCCESS! MongoDB Connected");
        console.log("Database Name:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ FAILED! MongoDB Connection Error:");
        console.error("Error Message:", error.message);
        console.error("\nCommon Solutions:");
        console.error("1. Check your internet connection");
        console.error("2. Verify IP address is whitelisted in MongoDB Atlas Network Access");
        console.error("3. Confirm database user credentials are correct");
        console.error("4. Make sure cluster is not paused in MongoDB Atlas");
        process.exit(1);
    });
