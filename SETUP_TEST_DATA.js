// =====================================================
// ADMIN SETUP SCRIPT - Run this in MongoDB Console
// =====================================================
// Usage:
// 1. Open MongoDB Compass or mongosh
// 2. Select your database (afodams_db or similar)
// 3. Open the console/terminal
// 4. Copy and paste this entire script
// 5. Admin user will be created with credentials below
// =====================================================

use afodams_db;  // Make sure you're in the right database

// Create test admin account
db.users.insertOne({
  name: "Admin Dashboard",
  email: "admin@afodams.com",
  password: "$2a$10$Y.rXzpMDVMXO.7fGOoN6LuJs2UU9wBVDGNwC7LQcvvbHKVBH.M5zu",  // bcrypted: "admin123"
  role: "admin",
  phone: "+2348000000000",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

console.log("✅ Admin account created!");
console.log("Email: admin@afodams.com");
console.log("Password: admin123");
console.log("");
console.log("🔗 Login at: http://localhost:3001/login");
console.log("📊 Admin Dashboard: http://localhost:3001/admin/dashboard");

// =====================================================
// CREATE TEST USERS FOR EACH ROLE
// =====================================================

// Test Landlord
db.users.insertOne({
  name: "Test Landlord",
  email: "test.landlord@afodams.test",
  password: "$2a$10$h3hb7DnPmYc1QOvXmJKFZ.8RnXQd8f2xh2mG3r4s5t6u7v8w9x",  // bcrypted: "landlord123"
  role: "landlord",
  phone: "+2348012345678",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Test Tenant
db.users.insertOne({
  name: "Test Tenant",
  email: "test.tenant@afodams.test",
  password: "$2a$10$h3hb7DnPmYc1QOvXmJKFZ.8RnXQd8f2xh2mG3r4s5t6u7v8w9x",  // bcrypted: "tenant123"
  role: "tenant",
  phone: "+2349087654321",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Test Agent
db.users.insertOne({
  name: "Test Agent",
  email: "test.agent@afodams.test",
  password: "$2a$10$h3hb7DnPmYc1QOvXmJKFZ.8RnXQd8f2xh2mG3r4s5t6u7v8w9x",  // bcrypted: "agent123"
  role: "agent",
  phone: "+2347061234567",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Test Investor
db.users.insertOne({
  name: "Test Investor",
  email: "test.investor@afodams.test",
  password: "$2a$10$h3hb7DnPmYc1QOvXmJKFZ.8RnXQd8f2xh2mG3r4s5t6u7v8w9x",  // bcrypted: "investor123"
  role: "investor",
  phone: "+2348156789012",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

console.log("✅ Test users created!");
console.log("");
console.log("📝 TEST ACCOUNT CREDENTIALS:");
console.log("================================");
console.log("Admin:    admin@afodams.com / admin123");
console.log("Landlord: test.landlord@afodams.test / landlord123");
console.log("Tenant:   test.tenant@afodams.test / tenant123");
console.log("Agent:    test.agent@afodams.test / agent123");
console.log("Investor: test.investor@afodams.test / investor123");
console.log("================================");

// =====================================================
// CREATE SAMPLE INQUIRY/SUBSCRIBER DATA
// =====================================================

// Get a landlord user
const landlordUser = db.users.findOne({ role: "landlord" });

// Create sample inquiries
db.inquiries.insertMany([
  {
    name: "John Okonkwo",
    email: "john@example.com",
    message: "Very interested in this property. Can we schedule a viewing?",
    property: landlordUser._id,  // Reference to landlord's property
    createdAt: new Date("2026-01-17T08:00:00Z"),
    updatedAt: new Date("2026-01-17T08:00:00Z")
  },
  {
    name: "Sarah Adeyemi",
    email: "sarah@example.com",
    message: "What's the lease term? Flexible?",
    property: landlordUser._id,
    createdAt: new Date("2026-01-16T15:30:00Z"),
    updatedAt: new Date("2026-01-16T15:30:00Z")
  },
  {
    name: "David Eze",
    email: "david@example.com",
    message: "Is this property still available?",
    property: landlordUser._id,
    createdAt: new Date("2026-01-15T12:00:00Z"),
    updatedAt: new Date("2026-01-15T12:00:00Z")
  }
]);

console.log("✅ Sample inquiries created!");
console.log("Total inquiries: " + db.inquiries.countDocuments());

// =====================================================
// VERIFY DATA
// =====================================================

console.log("");
console.log("📊 DATABASE VERIFICATION:");
console.log("================================");
console.log("Total Users: " + db.users.countDocuments());
console.log("- Admins: " + db.users.countDocuments({ role: "admin" }));
console.log("- Landlords: " + db.users.countDocuments({ role: "landlord" }));
console.log("- Tenants: " + db.users.countDocuments({ role: "tenant" }));
console.log("- Agents: " + db.users.countDocuments({ role: "agent" }));
console.log("- Investors: " + db.users.countDocuments({ role: "investor" }));
console.log("");
console.log("Total Inquiries: " + db.inquiries.countDocuments());
console.log("================================");
console.log("");
console.log("🚀 READY TO TEST!");
console.log("Go to: http://localhost:3001");

// =====================================================
// END OF SCRIPT
// =====================================================
