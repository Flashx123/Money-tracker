import express from 'express';
// const cors = require('cors');
import cors from 'cors';
import mongoose from 'mongoose';
import { TransactionModel } from './models/transaction.js';

import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

//const PORT = 3000;
app.use(cors());

app.use(express.json());
app.get('/api',(req,res)=>{
    res.json("this is it");
});

// this is atlas

app.post('/api/transaction',async(req,res)=>{

    console.log(process.env.MONGO_URL);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const { name,price, desc, datetime } = req.body;
        const transactionR = await TransactionModel.create({ name,price, desc, datetime });
        console.log('Received success', req.body);
        res.json(transactionR);
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }
})


app.get('/api/getTransactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const getTransactions = await TransactionModel.find();

    res.json(getTransactions);


})



app.listen(3000 ,()=>{
   console.log('server is choling');
});

