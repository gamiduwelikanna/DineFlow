import express from 'express';
import { addToCart } from '../controllers/cartController';
import { removeFromCart } from '../controllers/cartController.js';
import { getCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add', addToCart);
cartRouter.post('/remove', removeFromCart);
cartRouter.get('/', getCart);

export default cartRouter;
