import express from 'express';
import { addToCart } from '../controllers/cartController';
import { removeFromCart } from '../controllers/cartController.js';
import { getCart } from '../controllers/cartController.js';
import authMiddleware from '../middlware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware, addToCart);
cartRouter.post('/remove',authMiddleware, removeFromCart);
cartRouter.get('/',authMiddleware, getCart);

export default cartRouter;
