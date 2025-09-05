import dotenv from "dotenv";
import connectDB from "../config/db";
import User from "../models/User";
import Product from "../models/Product";
import Contact from "../models/Contact";
import bcrypt from "bcrypt";

dotenv.config({
  path: ".env",
});

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");

    // Clear
    await User.deleteMany({});
    await Product.deleteMany({});
    await Contact.deleteMany({});

    // create a demo user
    const hashed = await bcrypt.hash("password123", 10);
    const user = await User.create({
      username: "demo",
      email: "demo@business.com",
      password: hashed,
      businessName: "Demo Shop",
    });
    console.log("Created demo user", user._id);

    // sample products
    const products = await Product.insertMany([
      {
        name: "Notebook",
        description: "200 pages",
        price: 50,
        stock: 100,
        category: "Stationery",
        businessId: user._id,
      },
      {
        name: "Pen",
        description: "Blue ink",
        price: 10,
        stock: 300,
        category: "Stationery",
        businessId: user._id,
      },
      {
        name: "Water Bottle",
        description: "500ml",
        price: 150,
        stock: 50,
        category: "Utilities",
        businessId: user._id,
      },
    ]);

    // contacts
    const contacts = await Contact.insertMany([
      {
        name: "Rohit",
        phone: "9999999999",
        email: "rohit@example.com",
        address: "City A",
        type: "customer",
        businessId: user._id,
      },
      {
        name: "Vendor X",
        phone: "8888888888",
        email: "vendorx@example.com",
        address: "City B",
        type: "vendor",
        businessId: user._id,
      },
    ]);

    console.log("Seed completed");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
