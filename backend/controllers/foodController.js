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

//all food list
const listFood = async (req, res) => {
    try {
        const foods =  await foodModel.find({});
        res.json({ success: true, foods });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Fetching Food Items", error });
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Item Removed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Removing Food Item", error });
    }
}

export { addFoodItem, listFood, removeFood };