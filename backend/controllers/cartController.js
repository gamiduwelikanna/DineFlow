import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";


//add items to cart
const addToCart = async (req, res) => {
    try {
        let UserData = await userModel.findOne({ _id: req.userId });
        let cartData = await UserData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        UserData.cartData = cartData;
        await userModel.findByIdAndUpdate(req.userId, { cartData});
        res.status(200).json({ message: "Item added to cart"});
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
}


//remove items from cart
const removeFromCart = async (req, res) => {}


//fetch cart data
const getCart = async (req, res) =>{}

export { addToCart, removeFromCart , getCart};