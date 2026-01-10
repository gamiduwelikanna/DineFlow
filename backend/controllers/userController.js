import userModel from "../models/userModel";
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

//register user
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(409).json({message: "Email already in use"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

export {loginUser, registerUser};