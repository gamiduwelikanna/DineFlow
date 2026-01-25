import userModel from "../models/userModel.js";

//add items to cart
const addToCart = async (req, res) => {
    try {
        let UserData = await userModel.findOne({ _id: req.userId });
        let cartData = UserData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding item to cart", error: error.message });
    }
}


//remove items from cart
const removeFromCart = async (req, res) => {
    try{
        let UserData = await userModel.findById(req.userId);
        let cartData = UserData.cartData || {};
        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({ success: true, message: "Item removed from cart" });
    }catch(error){
        res.status(500).json({ success: false, message: "Error removing item from cart", error: error.message });
    }
}


//fetch cart data
const getCart = async (req, res) =>{
    try{
        let UserData = await userModel.findById(req.userId);
        let cartData = UserData.cartData || {};
        res.status(200).json({ success: true, cartData });
    }catch(error){
        res.status(500).json({ success: false, message: "Error fetching cart data", error: error.message });
    }
}

export { addToCart, removeFromCart, getCart };