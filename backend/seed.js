import mongoose from "mongoose";
import Product from "./models/Product.js";
import products from "./data/seedProducts.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Product.deleteMany();
await Product.insertMany(products);

console.log("Products seeded");
process.exit();
