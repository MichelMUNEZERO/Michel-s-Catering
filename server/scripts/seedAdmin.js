require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists");
      process.exit(0);
    }

    // Create admin user with pre-hashed password
    // Original password was securely hashed using bcrypt (salt rounds: 10)
    // No plain-text credentials are stored in the codebase
    // Using direct database insertion to bypass Mongoose pre-save hook
    const hashedPassword =
      "$2a$10$z6GDd41BeqDe85DKrWqZg.yaMnHUa0RdUp94dyXlUuVGC6lgrRJBy";

    await User.collection.insertOne({
      username: "admin",
      password: hashedPassword,
      role: "admin",
      email: "admin@kamutaltd.com",
      createdAt: new Date(),
    });

    console.log("✅ Admin user created successfully!");
    console.log("📧 Username: admin");
    console.log(
      "🔑 Password: [Securely hashed - refer to secure documentation]"
    );
    console.log("⚠️  IMPORTANT: Change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
