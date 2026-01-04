import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

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

app.get('/', (req, res) => {
    res.status(200).send('DineFlow Backend is running. API is working fine.');
});

app.listen(PORT, () => {
    console.log(`DineFlow Backend is running on  http://localhost:${PORT}`);
});

//mongodb+srv://dineflow:45121556Aa#@cluster0.c4dnmu5.mongodb.net/?
//mongodb+srv://dineflow:45121556Aa#@cluster0.c4dnmu5.mongodb.net/?appName=Cluster0