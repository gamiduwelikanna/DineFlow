import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing an order:frontend 
const placeOrder = async (req, res) => { 
    const frontend_url = "http://localhost:5173";
    try{
        const newOrder = new orderModel({
            userId : req.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address
        });
        await newOrder.save();

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100*80,
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({ 
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.query;
    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (success === 'true') {
            order.payment = true;
            order.status = "Order Placed";
            await order.save();
            await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
            return res.status(200).json({ success: true, message: "Payment successful and order verified" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.status(200).json({ success: false, message: "Payment failed, order cancelled" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
}

export {placeOrder, verifyOrder};