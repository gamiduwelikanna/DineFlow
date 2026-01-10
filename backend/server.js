import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

//app conifg
const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());

//db config
connectDB();

//api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("api/user",userRouter)

app.get('/', (req, res) => {
    res.status(200).send('DineFlow Backend is running. API is working fine.');
});

app.listen(PORT, () => {
    console.log(`DineFlow Backend is running on  http://localhost:${PORT}`);
});
