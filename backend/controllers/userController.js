import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

//login user
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }

        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                cartData: user.cartData
            }
        });
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}

//register user
export const registerUser = async (req, res) => {
    try {
        const {name, password, email} = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(409).json({message: "Email already in use"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({success:true,token});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};