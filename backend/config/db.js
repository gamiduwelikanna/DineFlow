import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        console.log("\nTroubleshooting steps:");
        console.log("1. Check your internet connection");
        console.log("2. Verify MongoDB cluster is running in Atlas");
        console.log("3. Check if your IP is whitelisted in MongoDB Atlas Network Access");
        console.log("4. Verify the connection string in .env file");
        process.exit(1);
    }
}