import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

//app conifg
const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('DineFlow Backend is running. API is working fine.');
});

app.listen(PORT, () => {
    console.log(`DineFlow Backend is running on  http://localhost:${PORT}`);
});