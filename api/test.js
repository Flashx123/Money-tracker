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

app.post('/api/transaction',(req,res)=>{

    console.log(process.env.MONGO_URL);
    const {name,desc,datetime} = req.body;

    //mongoose.connect(process.env.REACT_APP_MONGO_URL);





    console.log('Recieved success' ,req.body);
    res.json(req.body);
})



app.listen(3000 ,()=>{
   console.log('server is choling')
});

