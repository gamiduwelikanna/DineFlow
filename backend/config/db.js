import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dineflow:45121556Aa@cluster0.c4dnmu5.mongodb.net/dineflow').then(()=>console.log("MongoDB connected successfully"))}