import { createdOrder, paymentCallback } from "./rp";
import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import dotenv from 'dotenv';

const app = express();
const port = 3000;
dotenv.config();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/order', createdOrder)

app.post('/callback', paymentCallback)

app.get('/payment', (req, res) => {
    res.render('index');
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});