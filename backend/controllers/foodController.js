import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFoodItem = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "Image file is required" });
    }
    
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });
    try {
        await food.save();
        res.json({ success: true, message: "Food Item Added Successfully", food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Adding Food Item", error });
    }
}

export { addFoodItem };